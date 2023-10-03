import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  Timestamp,
  limit,
  startAfter,
  getDocs,
  QuerySnapshot,
  DocumentData,
  addDoc,
  Unsubscribe,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  DocumentChangeType,
  runTransaction,
} from 'firebase/firestore'

const initialized = initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_ID,
  appId: process.env.FB_APP_ID,
  databaseURL: process.env.FB_DATABASE_URL,
})

const db = getFirestore(initialized)

type DateAndRef = {
  created: number
  modified?: number
  refId: string
}

abstract class FirebaseBody<
  T extends Record<string, any> = Record<string, any>,
  V extends Record<string, any> = Record<string, any>
> {
  public id?: string = ''
  public db: string
  public querySearch: [
    QueryFieldFilterConstraint | undefined,
    QueryOrderByConstraint
  ]
  public lastPage: QuerySnapshot<DocumentData> | undefined

  constructor(
    id: string,
    db: string,
    query: [QueryFieldFilterConstraint | undefined, QueryOrderByConstraint]
  ) {
    this.id = id
    this.db = db
    this.querySearch = query
  }

  public async sendData(data: T): Promise<void> {
    try {
      await addDoc(collection(db, this.db), {
        user: this.id,
        ...data,
        created: Timestamp.now().toMillis(),
      })
    } catch (e) {
      console.log(e)
    }
  }

  public listen(
    cb: (value: V & DateAndRef, type: DocumentChangeType) => void
  ): Unsubscribe {
    const q = query(
      collection(db, this.db),
      ...(this.querySearch.filter((v) => v !== undefined) as any),
      limit(1)
    )

    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        cb({ ...(change.doc.data() as any), refId: change.doc.id }, change.type)
      })
    })
  }

  public async getData(lim: number | undefined = 50) {
    try {
      const l = lim
      let q = !this.lastPage
        ? query(
            collection(db, this.db),
            ...(this.querySearch.filter((v) => v !== undefined) as any),
            limit(l)
          )
        : query(
            collection(db, this.db),
            ...(this.querySearch.filter((v) => v !== undefined) as any),
            startAfter(this.lastPage.docs[this.lastPage.docs.length - 1]),
            limit(l)
          )

      const snapshot = await getDocs(q)

      this.lastPage = snapshot
      const value: (V & DateAndRef)[] = []
      snapshot.forEach((v) => {
        value.push({ ...(v.data() as any), refId: v.id })
      })

      return value
    } catch (e) {
      return []
    }
  }
}

export class FirebaseAdminRealtimeMessaging<
  T extends Record<string, any> = Record<string, any>,
  V extends Record<string, any> = Record<string, any>
> extends FirebaseBody<T, V> {
  constructor(id: string) {
    super(id, 'users', [undefined, orderBy('chatModified', 'desc')])
  }
}

export class FirebaseRealtimeMessaging<
  T extends Record<string, any> = Record<string, any>,
  V extends Record<string, any> = Record<string, any>
> extends FirebaseBody<T, V> {
  private refId?: string

  constructor(id: string) {
    super(id, 'chat', [where('user', '==', id), orderBy('created', 'desc')])
  }

  public async sendData(data: T): Promise<void> {
    try {
      const name = data?.name

      delete data.name

      await runTransaction(db, async (transaction) => {
        const newDoc = doc(collection(db, this.db))
        transaction.set(doc(db, this.db, newDoc.id), {
          user: this.id,
          ...data,
          created: Timestamp.now().toMillis(),
        })

        if (!this.refId) {
          const q = query(
            collection(db, 'users'),
            where('id', '==', this.id),
            limit(1)
          )

          const searchQuery = await getDocs(q)

          if (searchQuery.empty) {
            const newUser = doc(collection(db, 'users'))
            this.refId = newUser.id
            transaction.set(doc(db, 'users', newUser.id), {
              id: this.id,
              name,
              lastMessage: data.message,
              chatModified: Timestamp.now().toMillis(),
            })
            return
          } else {
            searchQuery.forEach((v) => {
              this.refId = v.id
            })
          }
        }

        const ref = doc(db, 'users', this.refId!)
        transaction.update(ref, {
          name,
          lastMessage: data.message,
          chatModified: Timestamp.now().toMillis(),
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
