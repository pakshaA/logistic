'use client'
import { Search } from "./searchInput/search"
import Style from './calc.module.scss'
import data from '../../../helpers/filtered_cities.json'
import { useState } from "react"
import { PackageSelect } from "./boxDropDown/box"

export const Calculator = () => {
    const cities = data

    return (
        <div className={Style['wrapper']}>
            <p className={Style.header}>Рассчитать доставку</p>
            <div className={Style.container}>
                <div className={Style.SearchContainer}>
                    <Search data={cities} />
                </div>
                <div className={Style.selectBoxContainer}>
                    <PackageSelect />
                </div>
            </div>
        </div>
    )
}