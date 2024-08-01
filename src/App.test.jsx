import {render, screen} from '@testing-library/react'
import App from './App';

test("shows the header text on screen", () => {
    render(<App/>);
    const textMessage = screen.getByText("Header Test");
    expect(textMessage).toBeInTheDocument()
});

test("shows the Quiz component", () => {
    render(<App/>);
    const textMessage = screen.getByText("Quiz");
    expect(textMessage).toBeInTheDocument()
});

test("shows the Main Component", () => {
    render(<App/>);
    const textMessage = screen.getByText("Main");
    expect(textMessage).toBeInTheDocument()
});