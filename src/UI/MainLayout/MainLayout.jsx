const MainLayout = ({children}) => {
    return (
        <div className="mainContainer">
            <header className="header">
                <h1 className="mainHeading">Пиу-пиу!</h1>
                <p className="mainDesc">Меньше астероидов - спокойней на душе</p>
            </header>
            <main>{children}</main>
            <footer className="footer">
                <p>Все права и жители планеты защищены</p>
            </footer>
        </div> 
     );
}
 
export default MainLayout;