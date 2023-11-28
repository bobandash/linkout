import { useRef } from 'react';
import Header from '../../components/Header';
import LoadingScreen from '../Loading/index';
import LinkOutBtn from './components/LinkOutBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import useAutosizeTextArea from './__hooks__/useAutosizeTextArea';
import Footer from '../../components/Footer';
import Message from './components/Message';
import MessageProps from './interface/message';
import useMessagePage from './__hooks__/useMessagePage';
import useTextbox from './__hooks__/useTextbox';

function calcMinuteDifference(date1: string, date2: string) {
  const msDiff = Math.abs(
    new Date(date1).getTime() - new Date(date2).getTime(),
  );
  const minDiff = msDiff / 1000 / 60;
  return minDiff;
}

const MessagePage = () => {
  const { community, communityMessages, isLoading } = useMessagePage();
  const { message, handleMessage, handleSubmitMessage } = useTextbox();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutosizeTextArea(textAreaRef.current, message);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (community !== null) {
    return (
      <div className="flex h-screen flex-col bg-color_3">
        <Header
          name={community.name}
          children={<LinkOutBtn />}
          image={community.profilePic}
        />
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
        <div className="mt-auto flex flex-row bg-color_1 p-5 pb-3 xl:pb-5 2xl:p-7">
          <form
            encType="multipart/form-data"
            className="flex items-start justify-center bg-color_2 p-3"
          >
            <button className="relative hover:cursor-pointer">
              <input
                type="file"
                className="absolute left-0 top-0 h-full w-full opacity-0 hover:cursor-pointer"
                accept="image/png, image/jpeg"
              />
              <FontAwesomeIcon icon={faPlusCircle} color={'#FFF'} size={'xl'} />
            </button>
          </form>
          <form
            onSubmit={async (e) => {
              await handleSubmitMessage(e);
            }}
            encType="multipart/form-data"
            className="relative mt-auto flex flex-grow flex-row bg-color_1"
          >
            <textarea
              ref={textAreaRef}
              className="flex-grow resize-none bg-color_2 p-3 text-xl text-white focus:outline-none"
              placeholder="Write a message"
              rows={1}
              onChange={handleMessage}
            ></textarea>
            <button className="flex items-start justify-center bg-color_2 p-3">
              <FontAwesomeIcon icon={faPaperPlane} color={'#FFF'} size={'xl'} />
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
};

export default MessagePage;
