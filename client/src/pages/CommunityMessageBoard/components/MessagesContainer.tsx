import Message from '../components/Message';
import MessageProps from '../interface/message';
import { FC } from 'react';

interface MessageContainerProps {
  communityMessages: Array<MessageProps>;
}

function calcMinuteDifference(date1: string, date2: string) {
  const msDiff = Math.abs(
    new Date(date1).getTime() - new Date(date2).getTime(),
  );
  const minDiff = msDiff / 1000 / 60;
  return minDiff;
}

const MessagesContainer: FC<MessageContainerProps> = ({
  communityMessages,
}) => {
  return (
    <div className="m-h-0 flex-grow overflow-auto px-5 py-4 text-2xl text-white md:p-7 md:py-4 lg:p-10 lg:py-2 2xl:p-16 2xl:py-2">
      {communityMessages.length === 0 && (
        <div className="text-center text-gray">
          The Start of Your Conversations...
        </div>
      )}

      {communityMessages.map((message: MessageProps, index) => {
        // Decides whether or not to render values like username, date, pfp
        let isNewDay = false;
        if (index === 0) {
          isNewDay = true;
        }
        if (index > 0) {
          const prevMessage = communityMessages[index - 1];
          const prevUsername = prevMessage.sender.profile.username;
          const prevTime = prevMessage.createdAt;
          const prevDate = prevMessage.longDateFormatted;

          const currentUsername = message.sender.profile.username;
          const currentTime = message.createdAt;
          const currentDate = message.longDateFormatted;

          const minDiff = calcMinuteDifference(prevTime, currentTime);
          isNewDay = currentDate !== prevDate;
          if (currentUsername === prevUsername && minDiff <= 10) {
            return (
              <Message
                key={message._id}
                message={message}
                hasMessageDetails={false}
                isNewDay={isNewDay}
              />
            );
          }
        }

        return (
          <Message
            key={message._id}
            message={message}
            hasMessageDetails={true}
            isNewDay={isNewDay}
          />
        );
      })}
    </div>
  );
};

export default MessagesContainer;
