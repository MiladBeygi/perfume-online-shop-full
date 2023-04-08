import { Footer } from "flowbite-react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function MyFooter(props) {
    return <Fragment>

        <Footer container={true}>
            <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    <Footer.Brand
                        href="http://localhost:3000/"
                        src="/img/logo.png"
                        alt="Flowbite Logo"
                        name="Odeur"
                    />
                    <Footer.LinkGroup>
                        <NavLink className='mx-4' to='/contact-us'>
                            تماس با ما
                        </NavLink>
                        <NavLink className='mx-4' to='/about'>
                            درباره ما
                        </NavLink>
                        <NavLink className='mx-4' to='/privacy-policy'>
                            سیاست‌ها و ومقررات
                        </NavLink>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <Footer.Copyright
                    href="https://github.com/MiladBeygi"
                    by="Milad Beygi"
                    year={2022}
                />
                <div className="mt-4 flex justify-center sm:mt-0 ">
                    <div className="mx-2"><a href="#"><i className="fa fa-instagram"></i></a></div>
                    <div className="mx-2"><a href="#"><i className="fa fa-whatsapp"></i></a></div>
                    <div className="mx-2"><a href="#"><i className="fa fa-facebook"></i></a></div>
                    <div className="mx-2"><a href="#"><i className="fa fa-twitter"></i></a></div>

                </div>
            </div>
        </Footer>

    </Fragment>
}
