import React, { useState, useEffect } from 'react';
import blueFrog from '/svg/blue-frog.svg'
import goldFrog from '/svg/gold-frog.svg'
import greenFrog from '/svg/green-frog.svg'
import orangeFrog from '/svg/orange-frog.svg'
import pinkFrog from '/svg/pink-frog.svg'
import noFrog from '/svg/no-frog.svg'


import './App.css';

const width = 8
const height = 8
const grid = width * height

const iconColors = [
    // //blue
    // '#0a33bd',
    // //green
    // '#35a00c',
    // //orange
    // '#f98500',
    // //gold
    // '#eac50b',
    // //red
    // '#f5473a',
    // //pink
    // '#f238ee'
    blueFrog, goldFrog, greenFrog, orangeFrog, pinkFrog
]

let threeRowExclude = []
let fourRowExclude = []

function App() {

    const [iconColorsGrid, setIconColorsGrid] = useState([])

    function createGrid() {
        const randomIconColorsList = []
        for (let i = 0; i < (width * height); i++) {
            const randomColor = iconColors[Math.floor(Math.random() * iconColors.length)]
            randomIconColorsList.push(randomColor)
        }

        setIconColorsGrid(randomIconColorsList)
        console.log(iconColorsGrid)
    }

    function setRowExclusions() {
        for (let i = width; i <= grid; i+= width) {
            threeRowExclude.push(i-1)
            fourRowExclude.push(i-1)
            threeRowExclude.push(i-2)
            fourRowExclude.push(i-2)
            fourRowExclude.push(i-3)
        }
    }

    useEffect(() => {
        createGrid()
        setRowExclusions()
    }, [])


    const threeColumnMatch = () => {

        for (let i = 0; i < (grid-(width * 2)-1); i++) {
            const column = [i, i + width, i + (width * 2)]
            const columnColor = iconColorsGrid[i]
            console.log(columnColor)
            console.log(column)

            if (column.every(icon => iconColorsGrid[icon] === columnColor)) {
                column.forEach(icon => iconColorsGrid[icon] = noFrog)
            }
        }
    }

    const fourColumnMatch = () => {

        for (let i = 0; i < (grid-(width * 3)-1); i++) {
            const column = [i, i + width, i + (width * 2), i + (width * 3),]
            const columnColor = iconColorsGrid[i]

            if (column.every(icon => iconColorsGrid[icon] === columnColor)) {
                column.forEach(icon => iconColorsGrid[icon] = noFrog)
            }
        }
    }

    
    const threeRowMatch = () => {

        for (let i = 0; i < grid; i++) {
            if (!threeRowExclude.includes(i)) {
                const row = [i, i + 1, i + 2]
                const rowColor = iconColorsGrid[i]

                if (row.every(icon => iconColorsGrid[icon] === rowColor)) {
                    row.forEach(icon => iconColorsGrid[icon] = noFrog)
                }
            }
        }
    }

    const fourRowMatch = () => {

        for (let i = 0; i < grid; i++) {
            if (!fourRowExclude.includes(i)) {
                const row = [i, i + 1, i + 2]
                const rowColor = iconColorsGrid[i]

                if (row.every(icon => iconColorsGrid[icon] === rowColor)) {
                    row.forEach(icon => iconColorsGrid[icon] = noFrog)
                }
            }
        }
    }

    const dropIcon = () => {
        for (let i = 0; i < (grid - width); i++) {

            if (i < width && iconColorsGrid[i] === noFrog) {
                iconColorsGrid[i] = iconColors[Math.floor(Math.random() * iconColors.length)]
            }

            if ((iconColorsGrid[i + width]) === noFrog) {

                iconColorsGrid[i + width] = iconColorsGrid[i]
                iconColorsGrid[i] = noFrog
            }
        }
    }

    useEffect(() => {
        const activeTimer = setInterval(() => {
            fourColumnMatch()
            fourRowMatch()
            threeColumnMatch()
            threeRowMatch()
            dropIcon()
            setIconColorsGrid([...iconColorsGrid])
            }, 300)
            
        return () => clearInterval(activeTimer)
    }, [fourColumnMatch, fourRowMatch, threeColumnMatch, threeRowMatch, dropIcon, iconColorsGrid])


    return (
        <main className="app">
            <div className="game">
                {iconColorsGrid.map((iconColors, index) => (
                    <img
                        src={iconColors}
                        key = {index}
                        id = {index}
                        style = {{backgroundColor: iconColors}}
                    />
                ))}
            </div>
        </main>
    );
}

export default App;