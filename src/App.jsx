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

//gives the svg a border
const getFilterCSS = color => {
    return `drop-shadow(2px 0 0 ${color}) drop-shadow(-2px 0 0 ${color}) drop-shadow(0 2px 0 ${color}) drop-shadow(0 -2px 0 ${color})`
}

// currently all black until I want to change it
const getFrogOutline = iconColor => {
    if (iconColor === blueFrog) return getFilterCSS('black')
    if (iconColor === orangeFrog)  return getFilterCSS('black')
    if (iconColor === greenFrog) return getFilterCSS('black')
    if (iconColor === goldFrog)  return getFilterCSS('black')
    if (iconColor === pinkFrog)  return getFilterCSS('black')

}

let threeRowExclude = []
let fourRowExclude = []

function App() {

    const [iconColorsGrid, setIconColorsGrid] = useState([])
    const [draggedIcon, setDraggedIcon] = useState(null)
    const [replacedIcon, setReplacedIcon] = useState(null)

    function createGrid() {
        const randomIconColorsList = []
        for (let i = 0; i < (width * height); i++) {
            const randomColor = iconColors[Math.floor(Math.random() * iconColors.length)]
            randomIconColorsList.push(randomColor)
        }

        setIconColorsGrid(randomIconColorsList)
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

        for (let i = 0; i <= (grid-(width * 2)-1); i++) {
            const column = [i, i + width, i + (width * 2)]
            const columnColor = iconColorsGrid[i]

            if (column.every(icon => iconColorsGrid[icon] === columnColor)) {
                column.forEach(icon => iconColorsGrid[icon] = noFrog)
            }
        }
    }

    const fourColumnMatch = () => {

        for (let i = 0; i <= (grid-(width * 3)-1); i++) {
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

    const moveIconDown = () => {
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
            moveIconDown()
            setIconColorsGrid([...iconColorsGrid])
            }, 300)
            
        return () => clearInterval(activeTimer)
    }, [fourColumnMatch, fourRowMatch, threeColumnMatch, threeRowMatch, moveIconDown, iconColorsGrid])


    const dragStart = (e) => {
        setDraggedIcon(e.target)
    }

    const dragDrop = (e) => {
        setReplacedIcon(e.target)
    }

    const dragEnd = () => {

        const iconBeingDraggedIndex = parseInt(draggedIcon.getAttribute('data-id'))
        const replacedIconIndex = parseInt(replacedIcon.getAttribute('data-id'))

        iconColorsGrid[replacedIconIndex] = draggedIcon.getAttribute('src')
        iconColorsGrid[iconBeingDraggedIndex] = replacedIcon.getAttribute('src')

        const validMoves = [
            
        ]
    }

    return (
        <main className="app">
            <div className="game">
                {iconColorsGrid.map((iconColors, index) => (
                    <img
                        src = {iconColors}
                        style = {{filter: getFrogOutline(iconColors)}}
                        key = {index}
                        data-id = {index}
                        data-color = {iconColors}
                        draggable = {true}
                        onDragOver = {(e) => e.preventDefault()}
                        onDragEnter = {(e) => e.preventDefault()}
                        onDragLeave = {(e) => e.preventDefault()}
                        onDragStart = {dragStart}
                        onDrop = {dragDrop}
                        onDragEnd = {dragEnd}
                    />
                ))}
            </div>
        </main>
    );
}

export default App;