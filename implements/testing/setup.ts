import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { TestScheduler } from 'rxjs/testing';

Enzyme.configure({ adapter: new Adapter() });

global.console.error = jest.fn();

global.scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});
