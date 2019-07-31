/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllItems} from './all-Items'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllItems', () => {
  let allItems
  let wrapper = shallow(
    <AllItems
      items={[
        {
          name: 'Sapient Pearwood Chest',
          quantity: 0,
          imageUrl:
            'https://www.discworldemporium.com/829-thickbox_default/the-luggage.jpg',
          price: 1000.0,
          description:
            'A large chest made of sapient pearwood (a magical intelligent plant which is nearly extinct), impervious to magic and only grows in a few places outside the Agatean Empire, generally on sites of very old magic.  It can produce hundreds of little legs protruding from its underside and can move really fast if the need arises.  It has been described as half suitcase, half homicidal maniac.'
        }
      ]}
    />
  )

  // beforeEach(() => {
  //   allItems = shallow(
  //     <AllItems
  //       items={[
  //         {
  //           name: 'Sapient Pearwood Chest',
  //           quantity: 0,
  //           imageUrl:
  //             'https://www.discworldemporium.com/829-thickbox_default/the-luggage.jpg',
  //           price: 1000.0,
  //           description:
  //             'A large chest made of sapient pearwood (a magical intelligent plant which is nearly extinct), impervious to magic and only grows in a few places outside the Agatean Empire, generally on sites of very old magic.  It can produce hundreds of little legs protruding from its underside and can move really fast if the need arises.  It has been described as half suitcase, half homicidal maniac.'
  //         }
  //       ]}
  //     />
  //   )
  // })

  it('ComponentDidMount', () => {
    expect(allItems.find('h3').text()).to.be.equal('Sapient Pearwood Chest')
  })

  it('renders the item name in an h3', () => {
    expect(allItems.find('h3').text()).to.be.equal('Sapient Pearwood Chest')
  })
})
