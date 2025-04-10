import Style from './header.module.scss'

export const Header = () => {
    return (
        <div className={Style.header}>
            <div className="container">
                <div className={Style.headerWrapper}>
                    Первая логистика товаров и продуктов 
                </div>
            </div>           
        </div>
    )
}