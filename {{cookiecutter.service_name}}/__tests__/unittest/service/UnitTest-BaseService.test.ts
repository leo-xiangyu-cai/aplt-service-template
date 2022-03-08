import BaseService from '../../../src/service/BaseService';

describe('[Method] ----> generateResponse', () => {
  it('Given: status, massage and data. Then: generate response.', () => {
    // arrange
    const baseController = new BaseService();
    const ctxReq = {};
    const status = 200;
    const message = 'OK';
    const data = null;

    // act
    const response = baseController.generateResponse(
      ctxReq,
      status,
      message,
      data,
    );

    // assert
    expect(response.status).toEqual(status);
    expect((<any>(response.body)).message).toEqual(message);
  });
});

describe('[Method] ----> generate200Ok', () => {
  it('Given: data. Then: generate response.', () => {
    // act
    const ctx = new BaseService().generate200Ok({});

    // assert
    expect(ctx.status).toEqual(200);
    expect((<any>(ctx.body)).message).toEqual('OK');
  });
});

describe('[Method] ----> generate201Ok', () => {
  it('Given: data. Then: generate response.', () => {
    // arrange
    const message = 'Create Successfully';
    // act
    const ctx = new BaseService().generate201Ok({}, message);

    // assert
    expect(ctx.status).toEqual(201);
    expect((<any>(ctx.body)).message).toEqual(message);
  });
});

describe('[Method] ----> generate400RequestInvalid', () => {
  it('Given: errors. Then: generate response.', () => {
    // arrange
    const errors = [
      {
        target: {
          email: 'leo.cai@aplt.com',
          username: 'LeoCai',
          password: '12',
        },
        value: '12',
        property: 'password',
        children: [],
        constraints: {
          isLength: 'password must be longer than or equal to 6 characters',
        },
      },
    ];

    // act
    const ctx = new BaseService().generate400RequestInvalid({}, errors);

    // assert
    expect(ctx.status).toEqual(400);
    expect((<any>(ctx.body)).message).toEqual('Invalid Request');
    expect((<any>(ctx.body)).data).toMatchObject(errors);
  });
});

describe('[Method] ----> generate401Unauthorized', () => {
  it('Given: message. Then: generate response.', () => {
    // arrange
    const message = 'You do not have the permission to access this endpoint.';

    // act
    const ctx = new BaseService().generate401Unauthorized({}, message);

    // assert
    expect(ctx.status).toEqual(401);
    expect((<any>(ctx.body)).message).toEqual(message);
  });
});

describe('[Method] ----> generate403Forbidden', () => {
  it('Given: message. Then: generate response.', () => {
    // arrange
    const message = 'You are unauthorized';

    // act
    const ctx = new BaseService().generate403Forbidden({});

    // assert
    expect(ctx.status).toEqual(403);
    expect((<any>(ctx.body)).message).toEqual(message);
  });
});

describe('[Method] ----> generate500InternalError', () => {
  it('Given: error string, Then: generate response.', () => {
    // arrange
    const error = 'error message';

    // act
    const ctx = new BaseService().generate500InternalError({}, error);

    // assert
    expect(ctx.status).toEqual(500);
    expect((<any>(ctx.body)).message).toEqual(error);
  });
});
