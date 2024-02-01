const bcrypt = require('bcryptjs');
const { hashPassword, createUser } = require('../createUser');
const User = require('../../../models/User');
const Profile = require('../../../models/Profile');
jest.mock('../../../models/User');
jest.mock('../../../models/Profile');
jest.mock('bcryptjs', () => ({
  hash: jest.fn((data, salt, callback) => {
    callback(null, `hashed_${data}`);
  }),
}));

describe('hashPassword', () => {
  it('should hash the password', async () => {
    await hashPassword('password');
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
  });

  it('should handle errors during hashing', async () => {
    bcrypt.hash.mockImplementationOnce((data, salt, callback) => {
      callback(new Error('Hashing error'));
    });
    await expect(hashPassword('password')).rejects.toThrow('Hashing error');
  });
});

describe('createUser', () => {
  it('should create a new user successfully', async () => {
    const mockSave = jest.fn(() => {
      Promise.resolve();
    });

    jest.spyOn(Profile.prototype, 'save').mockImplementationOnce(mockSave);
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(mockSave);

    const email = 'test@example.com';
    const password = 'password';
    const displayName = 'TestUser';

    const result = await createUser(email, password, displayName);

    expect(result).toEqual({
      success: 'Your account was successfully created.',
    });
  });

  it('should handle errors during user creation', async () => {
    // Mocking the Profile and User models to simulate an error during saving
    const mockSave = jest.fn(() => {
      throw new Error('Saving error');
    });

    jest.spyOn(Profile.prototype, 'save').mockImplementationOnce(mockSave);
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(mockSave);

    const email = 'test@example.com';
    const password = 'password';
    const displayName = 'TestUser';

    await expect(createUser(email, password, displayName)).rejects.toThrow(
      'Saving error',
    );
  });
});
