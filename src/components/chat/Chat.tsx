import { useEffect, useRef, useState } from 'react'
import { Flex, Text } from 'rebass'
import { theme } from 'utils/theme'
import { useUser } from '../../hooks/useUser'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { format } from 'date-fns'
import { FirebaseRealtimeMessaging } from 'firebaseapp'

export const Chat = () => {
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  return (
    <Flex sx={{ position: 'absolute', bottom: 12, right: 12, zIndex: 3 }}>
      {!!open && user?.id && (
        <Flex
          sx={{
            position: 'absolute',
            right: 65,
            width: 300,
            height: 400,
            background: 'white',
            bottom: 0,
            borderRadius: 8,
            padding: '8px',
            gap: 2,
            flexDirection: 'column',
          }}
        >
          <Text as={'h4'}>Chat</Text>
          <ChatMessages id={user.id} />
          <ChatInput id={user.id} name={user.name} />
        </Flex>
      )}
      <Flex
        sx={{
          height: 60,
          width: 60,
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100%',
          backgroundColor: theme.colors.pink,
          border: '1px solid black',
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <Text as="h3">Chat</Text>
      </Flex>
    </Flex>
  )
}

export const ChatMessages = ({ id }: { id: string }) => {
  const [data, setData] = useState<
    {
      refId: string
      created: number
      message: string
      isUser: boolean
    }[]
  >([])
  const fb = useRef(
    new FirebaseRealtimeMessaging<{ message: string }>(id)
  ).current

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isMounted) {
      const sub = fb.listen((v, t) => {
        if (t === 'added') {
          setData((val) =>
            !val.some((check) => {
              return check.refId === v.refId
            })
              ? [...val, v as any]
              : val
          )
        }
      })

      return () => {
        sub()
      }
    }
  }, [id, isMounted])

  useEffect(() => {
    fb.getData(20)
      .then((v) => setData((val) => [...val, ...(v as any).reverse()]))
      .finally(() => {
        setIsMounted(true)
      })
  }, [])

  return (
    <Flex
      flexDirection="column"
      padding={2}
      sx={{ borderRadius: 8, overflowY: 'scroll', gap: 2 }}
      flex={1}
    >
      {data.map((v, i) => {
        return (
          <UserMessage
            message={v.message}
            key={i}
            isUser={v.isUser}
            date={new Date(v.created)}
          />
        )
      })}
    </Flex>
  )
}

export const UserMessage = ({
  message,
  isUser,
  date,
}: {
  message: string
  date?: Date
  isUser?: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <Flex
      ref={ref}
      width={'45%'}
      maxWidth={'45%'}
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      justifyContent={isUser ? 'flex-end' : undefined}
      flexDirection={'column'}
      alignItems={isUser ? 'flex-end' : 'flex-start'}
    >
      <Flex width={'100%'} justifyContent={isUser ? 'end' : 'start'}>
        <Text
          width={'auto'}
          alignItems={isUser ? 'flex-end' : 'flex-start'}
          color={theme.colors.black}
          padding={2}
          backgroundColor={!isUser ? theme.colors.white : theme.colors.pink}
          sx={{
            borderRadius: 8,
            ...(!isUser
              ? {
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'black',
                  justifyContent: 'flex-end',
                }
              : {}),

            wordBreak: 'break-all',
            wordWrap: 'break-word',
          }}
        >
          {message}
        </Text>
      </Flex>
      {!!date && (
        <Text
          sx={{
            fontSize: 11,
            opacity: 0.5,
            textAlign: isUser ? 'end' : 'start',
          }}
        >
          {format(date, 'cccc LLLL d, yyyy hh:mm a')}
        </Text>
      )}
    </Flex>
  )
}

const ChatInput = ({ id, name }: { id: string; name: string }) => {
  const [message, setMessage] = useState('')
  let fb = useRef(
    new FirebaseRealtimeMessaging<{
      message: string
      isUser: boolean
      name: string
    }>(id)
  )

  useEffect(() => {
    fb.current = new FirebaseRealtimeMessaging<{
      message: string
      isUser: boolean
      name: string
    }>(id)
  }, [id])

  return (
    <Flex flexDirection={['column', 'row']} sx={{ gap: 2 }}>
      <Input
        multiline={true}
        variant="outlined"
        inputcolor={{
          labelColor: 'gray',
          backgroundColor: 'white',
          borderBottomColor: theme.mainColors.first,
          color: 'black',
        }}
        label={'Message'}
        placeholder={'Type Message'}
        maxRows={3}
        padding={20}
        paddingBottom={15}
        sx={{ color: 'black', flex: 1 }}
        onChange={(v) => setMessage(v.target.value)}
        value={message}
      />
      <Button
        style={{ width: 50, height: 40 }}
        onClick={() => {
          if (!!id) {
            fb.current.sendData({ message, isUser: true, name })
            setMessage('')
          }
        }}
      >
        Send
      </Button>
    </Flex>
  )
}

// ChatInput.displayName = 'ChatInput'

// export const Chat = ({
//   title,
//   id,
//   from,
//   img = '/assets/logo.png',
// }: {
//   title: string
//   id: string
//   from?: string
//   img?: string
// }) => {
//   const [selected, setSelected] = useState({
//     loading: false,
//     id: '',
//   })

//   useEffect(() => {
//     setSelected({
//       id: '',
//       loading: true,
//     })
//     setTimeout(() => {
//       setSelected({
//         id,
//         loading: false,
//       })
//     }, 300)
//   }, [id])

//   return (
//     <Flex sx={{ flexDirection: 'column', gap: 2, overflow: 'auto' }} flex={1}>
//       {selected.id && !selected.loading ? (
//         <>
//           <Flex sx={{ gap: 2, alignItems: 'center' }} mb={2}>
//             <Image
//               src={img || '/assets/logo.png'}
//               size={64}
//               sx={{ borderRadius: '100%' }}
//               alt="logo"
//             />
//             <Text as={'h2'}>{title}</Text>
//           </Flex>

//           <ChatMessages id={id} from={from ?? id} />
//         </>
//       ) : (
//         <Flex flex={1}></Flex>
//       )}
//     </Flex>
//   )
// }
