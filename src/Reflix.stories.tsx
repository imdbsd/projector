import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import videoTest from './stories/assets/video-test.mp4'

import Reflix from './Reflix'

export default {
  title: 'Reflix/Player',
  component: Reflix,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Reflix>

const Template: ComponentStory<typeof Reflix> = (args) => <Reflix {...args} />

export const Default = Template.bind({})
Default.args = {
  src: videoTest,
}
