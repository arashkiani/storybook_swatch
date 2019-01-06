import React, { Component } from 'react';
import addons from '@storybook/addons';
import Swatch from './';

// Register the addon with a unique name.
addons.register('Swatch', api => {
  addons.addPanel('colors/panel', {
    title: 'Swatch',
    render: ({ active }) => (
      <Swatch channel={addons.getChannel()} api={api} active={active} />
    ),
  });
});
