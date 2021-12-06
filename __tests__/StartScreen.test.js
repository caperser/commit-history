//startScreen.test.js
//tests the rendering and button clicking on StartScreen.js
//Developer: Ericka capers
//Last edit date: 12/6/2021

import React from 'react';

import StartScreen from '../src/screens/StartScreen';
import {View, Text} from 'react-native';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const mockedDispatch = jest.fn();

//mocked navigation
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockedDispatch,
    }),
  };
});

describe('StartScreen', () => {
  beforeEach(() => {
      mockedDispatch.mockClear();
  });
  it('should render without issues', () => {
    const component = shallow(<StartScreen />);
    expect(toJson(component)).toMatchSnapshot();
  })
});