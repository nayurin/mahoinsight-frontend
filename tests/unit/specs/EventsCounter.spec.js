// Libraries
import Vuetify from 'vuetify'
// import Vuex from 'vuex'

// Components
import EventsCounter from '@/views/home/EventsCounter'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
// localVue.use(Vuex)

const dateFactory = (offset, date) => {
  date = date ?? new Date()
  offset = Number(offset) ?? 0

  const oneDay = 60 * 60 * 24 * 1000
  const nowTime = date.getTime()
  const nowArr = date.toUTCString().split(' ')

  const offsetTime = nowTime + oneDay * offset
  const offsetDate = new Date(offsetTime)
  const offsetArr = offsetDate.toUTCString().split(' ')

  return {
    now: `${nowArr[3]}/${date.getMonth() + 1}/${nowArr[1]} ${nowArr[4]}`,
    target: `${offsetArr[3]}/${offsetDate.getMonth() + 1}/${offsetArr[1]} ${offsetArr[4]}`
  }
}

const storeEvents = {
  event1: {
    title: 'event 1: current event',
    start: dateFactory(-1).target,
    end: dateFactory(5).target,
    category: 'gacha'
  },
  event2: {
    title: 'event 2: current event ends in 1 day',
    start: dateFactory(-1).target,
    end: dateFactory(1).target,
    category: 'gacha'
  },
  event3: {
    title: 'event 3: current event with description',
    start: dateFactory(-1).target,
    end: dateFactory(10).target,
    category: 'news',
    desc: 'test description from current event 3'
  },
  event4: {
    title: 'event 4: incoming event',
    start: dateFactory(2).target,
    end: dateFactory(5).target,
    category: 'news'
  },
  event5: {
    title: 'event 5: outdated event',
    start: dateFactory(-5).target,
    end: dateFactory(-1).target,
    category: 'sidestory'
  },
  event6: {
    title: 'event 6: incoming maintenance event',
    start: dateFactory(1).target,
    end: dateFactory(2).target,
    category: 'maintenance'
  }
}

describe('EventsCounter.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(EventsCounter, {
      vuetify,
      localVue,
      ...options
    }) 
  }
  
  it('render an current event which expires more than one day', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: { events: { cn: [storeEvents.event1] }}
        }
      },
      stubs: ['Calendar']
    })
    // expect(wrapper.html()).toMatchSnapshot()

    const title = wrapper.get('.v-chip__content > span')
    const textblock = wrapper.get('.v-card > .v-tooltip > .v-chip')
    const counterblock = wrapper.get('.v-card hr + .v-chip')
    expect(title.text()).toBe('event 1: current event')
    expect(textblock.classes()).toEqual(expect.arrayContaining(['green', 'darken-2']))
    expect(counterblock.classes()).toContain('v-chip--no-color')
  })

  it('render an current event which expires in one day', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: { events: { cn: [storeEvents.event2] }}
        }
      },
      stubs: ['Calendar']
    })
    // expect(wrapper.html()).toMatchSnapshot()

    const title = wrapper.get('.v-chip__content > span')
    const textblock = wrapper.get('.v-card > .v-tooltip > .v-chip')
    const counterblock = wrapper.get('.v-card hr + .v-chip')
    expect(title.text()).toBe('event 2: current event ends in 1 day')
    expect(textblock.classes()).toEqual(expect.arrayContaining(['green', 'darken-2']))
    expect(counterblock.classes()).toEqual(expect.arrayContaining(['pink', 'darken-1']))
  })

  // it('render an current event with description', async () => {
  //   const wrapper = mountWrapper(mount, {
  //     mocks: {
  //       $store: {
  //         state: { events: { cn: [storeEvents.event3] }}
  //       }
  //     },
  //     stubs: ['Calendar'],
  //     // scopedSlots: {
  //     //   activator: function () {
  //     //     return {
  //     //       on: jest.fn()
  //     //     }
  //     //   }
  //     // }
  //   })
    
  //   // const event = jest.fn()
  //   const title = wrapper.get('.v-chip__content > span')
  //   await title.trigger('mouseover')

  //   expect(wrapper.html()).toMatchSnapshot()

  //   const tooltip = wrapper.get('.v-tooltip__content > span')
  //   expect(title.text()).toBe('event 3: current event with description')
  //   expect(tooltip.text()).toBe('test description from current event 3')
  // })

  it('render an incoming event', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: { events: { cn: [storeEvents.event4] }}
        }
      },
      stubs: ['Calendar']
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const title = wrapper.get('.v-chip__content > span')
    const textblock = wrapper.get('.v-card > .v-tooltip > .v-chip')
    expect(title.text()).toBe('event 4: incoming event')
    expect(textblock.classes()).toContain('primary')
  })

  it('render an outdated event', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: { events: { cn: [storeEvents.event5] }}
        }
      },
      stubs: ['Calendar']
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const title = wrapper.get('.v-chip__content > span')
    const textblock = wrapper.get('.v-card > .v-tooltip > .v-chip')
    expect(title.text()).toBe('event 5: outdated event')
    expect(textblock.classes()).toEqual(expect.arrayContaining(['gray', 'darken-3']))
  })

  it('render an maintenance event', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: { events: { cn: [storeEvents.event6] }}
        }
      },
      stubs: ['Calendar']
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const title = wrapper.get('.v-chip__content > span')
    const textblock = wrapper.get('.v-card > .v-tooltip > .v-chip')
    expect(title.text()).toBe('event 6: incoming maintenance event')
    expect(textblock.classes()).toContain('error')
  })
})
