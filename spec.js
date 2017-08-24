const expect = require('chai').expect;
const rxSandbox = require('rx-sandbox').rxSandbox;

it('testcase', () => {
  const { hot, cold, flush, getMessages, e, s } = rxSandbox.create();
  const e1 = hot('  --^--a--b--|');
  const e2 = cold('   ---x--y--|', {x: 1, y: 2});

  const expected = e('       ---q--r--|');
  const sub =      s('       ^        !');

  const messages = getMessages(e1.merge(e2));

  flush();

  //assertion
  expect(messages).to.deep.equal(expected);
  expect(e1.subscriptions).to.deep.equal(sub);
});
