import { MessengerChat } from 'react-messenger-chat-plugin'

export const FaceBookComponent = () => {
  return (
    <MessengerChat
      pageId="108511637693025"
      language="en_US"
      themeColor={'#000000'}
      bottomSpacing={300}
      loggedInGreeting="loggedInGreeting"
      loggedOutGreeting="loggedOutGreeting"
      greetingDialogDisplay={'show'}
      debugMode={true}
      onMessengerShow={() => {
        console.log('onMessengerShow')
      }}
      onMessengerHide={() => {
        console.log('onMessengerHide')
      }}
      onMessengerDialogShow={() => {
        console.log('onMessengerDialogShow')
      }}
      onMessengerDialogHide={() => {
        console.log('onMessengerDialogHide')
      }}
      onMessengerMounted={() => {
        console.log('onMessengerMounted')
      }}
      onMessengerLoad={() => {
        console.log('onMessengerLoad')
      }}
    />
  )
}
