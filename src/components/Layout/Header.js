import { Fragment } from "react";
import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h3>ReactMeals</h3>
            <HeaderCartButton onClick={props.onClick}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="A table full of delicious food!" />
        </div>
    </Fragment>

}

export default Header;