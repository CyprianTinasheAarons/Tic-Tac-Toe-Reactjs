import React from 'react'
import './App.css'
import Board from "./components/board"

class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i: any) {
    const history =  this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? "X" : "O"
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })

  }
  
  jumpTo(step: number) {
    this.setState({ stepNumber: step , xIsNext: ( step % 2) === 0 })
  }

  render() {

    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step: number, move: number) => {
      const desc = move ? 'Go to move $' + move : 'Go to game start'
      return (
        <li key={ move}><button onClick={() => this.jumpTo(move)}> {desc}
        </button></li>
      )
    })
    let status
    if (winner) {
      status = <div className="status">Winners: {winner}</div>
    } else {
      status= 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="App">

        <h1>Tic Tac Toe</h1>

        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
              onClick={(i:any) => this.handleClick(i)}/>
          </div>
        </div>
        <div className="game-info">
          <div className="status">
            {status}
          </div>
          <ol>
            {moves} 
          </ol>
        </div>
    
      </div>
    )
  }
}


function calculateWinner(squares: any) {
    const lines = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    
    return null;
}
 
export default App




