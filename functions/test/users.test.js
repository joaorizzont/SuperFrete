const admin = require('firebase-admin');
const { createUser, getUser } = require('../index.js');

jest.mock('firebase-admin', () => {
  const mAdmin = {
    initializeApp: jest.fn(),
    firestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        add: jest.fn(),
        where: jest.fn().mockReturnValue({
          get: jest.fn()
        }),
      })
    })
  };
  return mAdmin;
});

describe('User Functions', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { method: '', body: {}, path: '' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    req.method = 'POST';
    req.body = { name: 'lorem ipsum' };

    admin.firestore().collection().add.mockResolvedValue({ id: '12345' });

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User successfully created!" });
  });

  it('should get a user by increment_id', async () => {
    const incrementId = 1
    req.method = 'GET';
    req.path = `/${incrementId}`;

    admin.firestore().collection().where().get.mockResolvedValue({
      empty: false,
      docs: [{
        data: () => ({ name: 'lorem ipsum', increment_id: incrementId })
      }]
    });

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User successfully found!", data: { name: 'lorem ipsum', increment_id: 1 } });
  });



  it('should return 404 if user not found', async () => {
    req.method = 'GET';
    req.path = '/99';

    admin.firestore().collection().where().get.mockResolvedValue({ empty: true });

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('User not found');
  });
});
