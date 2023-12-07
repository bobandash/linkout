import { useEffect, useState } from 'react';
import UserComponent from './components/UserComponent';
import axios from 'axios';
import { useParams } from 'react-router';
import UserProps from './interface/UserProps';

const OnlineSidebar = () => {
  const [users, setUsers] = useState<Array<UserProps>>([]);
  const { communityId } = useParams();
  useEffect(() => {
    async function getUsers() {
      if (communityId === undefined) {
        const response = await axios.get(`/api/users/community`);
        setUsers(response.data);
      } else {
        const response = await axios.get(`/api/users/community/${communityId}`);
        setUsers(response.data);
      }
    }
    getUsers();
  }, [communityId]);
  return (
    <div className="hidden max-h-screen overflow-x-auto overflow-y-scroll bg-color_2 p-5 scrollbar-none 2xl:flex 2xl:flex-col">
      <h1 className={'text-3xl text-white'}>Users</h1>
      <div className="mt-5">
        {users.map((user) => (
          <UserComponent key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default OnlineSidebar;
