import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import videoTest from './stories/assets/video-test.mp4'

import Projector from './Projector'

export default {
  title: 'Projector/Player',
  component: Projector,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Projector>

const Template: ComponentStory<typeof Projector> = (args) => (
  <Projector {...args} />
)

export const Default = Template.bind({})
Default.args = {
  // tenki no ko
  // src:
  //   'https://rs137ua.dood.video/u5kj62yxrthlsdgge6fwcisedutt2g6hwghhzpzycdfkhpksdahkwfhjqjva/p5wroxkiam~feocmWAStc?token=jkitiqqms1osjmwsqh8fg6hd&expiry=1625405825766',
  src: videoTest,
}
