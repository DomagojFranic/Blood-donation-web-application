import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Newevent from './Newevent'
import NeweventForm from './NeweventForm'

test('renderira sadrzaj', () => {
    const newevent = {
        dejt: "dejt",
        organizer: "Testiranje komponenti",
        location: "testiranje",
        address: "testiranje",
        time: "test",
        done: true
    }
    const component = render(
        <Newevent newevent={newevent}/>
    )

    component.debug()

    expect(component.container).toHaveTextContent("Testiranje komponenti")

    const element = component.getByText("Testiranje komponenti")
    expect(element).toBeDefined()
})

test('klik poziva event handler, done true', () => {
    const newevent = {
        dejt: "dejt",
        organizer: "Testiranje komponenti",
        location: "testiranje",
        address: "testiranje",
        time: "test",
        done: true
    }

    const testHandler = jest.fn()

    const component = render(
        <Newevent newevent={newevent} changeDone={testHandler}/>
    )

    const button = component.getByText('označi kao neodrađeno')
    fireEvent.click(button)

    expect(testHandler.mock.calls).toHaveLength(1)
})

test('klik poziva event handler, done false', () => {
    const newevent = {
        dejt: "dejt",
        organizer: "Testiranje komponenti",
        location: "testiranje",
        address: "testiranje",
        time: "test",
        done: false
    }

    const testHandler = jest.fn()

    const component = render(
        <Newevent newevent={newevent} changeDone={testHandler}/>
    )

    const button = component.getByText('označi kao odrađeno')
    fireEvent.click(button)

    expect(testHandler.mock.calls).toHaveLength(1)
})

test('<NeweventForm> poziva onSubmit i mijenja stanje roditelja', () => {
    const createNewevent = jest.fn()
    const component = render(
        <NeweventForm saveNewevent={createNewevent} />
    )
    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')
    fireEvent.change(input, {
        target: {value: 'Unesite organizatora:'}
    })
    fireEvent.submit(form)
    expect(createNewevent.mock.calls).toHaveLength(1)
    expect(createNewevent.mock.calls[0][0].organizer).toBe('Unesite organizatora:')
    })