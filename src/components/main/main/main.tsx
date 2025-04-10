import {Calculator} from '../calculator/calc'
import { GoodsSection } from '../goodsSection/section'
import Style from './main.module.scss'
import { Sum } from '../sum/sum'
import { Current } from '../current/current'
import { Header } from "@/components/header/header";

export const Main = () => {
    return (
        <div className={Style.wrapper}>
            <div className="container">
                <Header />
                <div className={Style.wrapperMain}>
                    <Calculator />
                    <GoodsSection />
                    <Sum />
                </div>
                <Current />
            </div>
        </div>
    )
}