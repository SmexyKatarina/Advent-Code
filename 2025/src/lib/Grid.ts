import { isInRange } from "./utils"

export type Cell = {
    position: {
        row: number
        col: number
    }
    cellValue: any
}

export class Grid {

    /**
     * The grid
     */
    private readonly _grid: Cell[][] = [];

    /**
     * The width of the grid
     */
    private readonly _width: number = 0;
    /**
     * The height of the grid.
     */
    private readonly _height: number = 0;

    /**
     * A mapping of the grid
     */
    private readonly ADJACENT_POSITIONS: [number, number][] = [
        [-1, -1], [-1, 0], [-1, 1], // North-West | North | North-East
        [0, -1], [0, 0], [0, 1], // West | Center | East 
        [1, -1], [1, 0], [1, 1] // South-West | South | South-East
    ]

    constructor(input: string, separator?: string) {
        const split = input.split(separator || "\n");
        for (let row = 0; row < split.length; row++) {
            this._grid.push(
                [...split[row].trim()]
                    .map((text, col) => ({
                        position: {
                            row, col
                        },
                        cellValue: text
                    } as Cell))
            );
        }
        this._width = this._grid[0].length;
        this._height = this._grid.length;
    }

    /**
     * Return a `Cell` from the grid.
     * @param row 0-indexed row of the `Cell` to search
     * @param col 0-indexed column of the `Cell` to search
     * @returns The `Cell` in the grid.
     */
    public getCell(row: number, col: number): Cell {
        if (!isInRange(row, 0, this._height - 1) ||
            !isInRange(col, 0, this._width - 1))
            throw new Error(`Invalid Position: ${row}, ${col}. Size: ${this._width}x${this._height}`);
        return this._grid[row][col];
    }

    /**
     * Get a row in the grid
     * @param row 0-indexed row of the grid.
     * @returns The row in the grid
     */
    public getRow(row: number): Cell[] {
        return this._grid[row];
    }
    
    /**
     * Get a row in the grid
     * @param row 0-indexed row of the grid.
     * @returns The row in the grid
     */
    public getColumn(column: number): Cell[] {
        return this._grid.map(x => x[column]);
    }

    /**
     * Set a `Cell`'s value
     * @param row 0-indexed row of the `Cell` to change
     * @param col 0-indexed column of the `Cell` to change
     * @param value The value to change it to
     * @returns The changed `Cell`.
     */
    public setCell(row: number, col: number, value: any): Cell {
        if (!isInRange(row, 0, this._height - 1) ||
            !isInRange(col, 0, this._width - 1))
            throw new Error(`Invalid Position: ${row}, ${col}. Size: ${this._width}x${this._height}`);
        this._grid[row][col].cellValue = value;
        return this._grid[row][col];
    }

    /**
     * Get orthogonally adjacent `Cell`s to the `Cell` given
     * ```
     * .0.
     * 1+2
     * .3.
     * ```
     * @param cell The `Cell` to check around
     * @param includeCenter Include the `Cell` being searched around?
     * @returns The `Cell`s orthogonally adjacent to the `Cell` given
     */
    public getOrthogonalCells(cell: Cell, includeCenter?: boolean): Cell[] {
        const { row: cellRow, col: cellCol } = cell.position;
        const positions = (includeCenter ? [1, 3, 4, 5, 7] : [1, 3, 5, 7]).map(x => this.ADJACENT_POSITIONS[x]);
        return positions.map(([row, col]) => {
            if (!isInRange(cellRow + row, 0, this._height - 1) ||
                !isInRange(cellCol + col, 0, this._width - 1)) return null;
            return this.getCell(cellRow + row, cellCol + col)
        }).filter(x => x !== null);
    }

    /**
     * Get diagonally adjacent `Cell`s to the `Cell` given
     * ```
     * 0.1
     * .+.
     * 2.3
     * ```
     * @param cell The `Cell` to check around
     * @param includeCenter Include the `Cell` being searched around?
     * @returns The `Cell`s orthogonally adjacent to the `Cell` given
     */
    public getDiagonalCells(cell: Cell, includeCenter?: boolean): Cell[] {
        const { row: cellRow, col: cellCol } = cell.position;
        const positions = (includeCenter ? [0, 2, 4, 6, 8] : [0, 2, 6, 8]).map(x => this.ADJACENT_POSITIONS[x]);
        return positions.map(([row, col]) => {
            if (!isInRange(cellRow + row, 0, this._height - 1) ||
                !isInRange(cellCol + col, 0, this._width - 1)) return null;
            return this.getCell(cellRow + row, cellCol + col)
        }).filter(x => x !== null);
    }

    /**
     * Get all surrounding `Cell`s to the `Cell` given
     * ```
     * 012
     * 3+4
     * 567
     * ```
     * @param cell The `Cell` to check around
     * @param includeCenter Include the `Cell` being searched around?
     * @returns The `Cell`s orthogonally and diagonally adjacent to the `Cell` given
     */
    public getAdjacentCells(cell: Cell, includeCenter?: boolean): Cell[] {
        const { row: cellRow, col: cellCol } = cell.position;
        const positions = includeCenter ? this.ADJACENT_POSITIONS : this.ADJACENT_POSITIONS.filter((_, i) => i !== 4);
        return positions.map(([row, col]) => {
            if (!isInRange(cellRow + row, 0, this._height - 1) ||
                !isInRange(cellCol + col, 0, this._width - 1)) return null;
            return this.getCell(cellRow + row, cellCol + col)
        }).filter(x => x !== null);
    }

    /**
     * Returns the grid.
     * @returns The grid of cells
     */
    public getGrid(): Cell[][] {
        return this._grid;
    }

    /**
     * Returns the grid, flatten to a single array
     * @returns The flattened version of the grid cells
     */
    public getFlatGrid(): Cell[] {
        return this._grid.flat();
    } 

    /**
     * Get the width of the grid
     * @returns The width of the grid
     */
    public getWidth(): number {
        return this._width
    }

    /**
     * Get the height of the grid
     * @returns The height of the grid
     */
    public getHeight(): number {
        return this._height;
    }

    /**
     * Print the grid to console
     */
    public printGrid(): void {
        console.log(`-= Grid (${this._width}x${this._height}) =-\n`);
        console.log(this._grid.map(row => row.map(col => col.cellValue).join("")).join("\n"));
        console.log(`\n-= Grid (${this._width}x${this._height}) =-\n`)
    }
}