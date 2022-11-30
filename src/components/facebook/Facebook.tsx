import { MessengerChat } from 'react-messenger-chat-plugin'

export const FaceBookComponent = () => {
  return (
    <MessengerChat
      pageId="108511637693025"
      themeColor={'#000000'}
      language="en_US"
      bottomSpacing={300}
      loggedInGreeting="loggedInGreeting"
      loggedOutGreeting="loggedOutGreeting"
      greetingDialogDisplay={'show'}

    />
  )
}
