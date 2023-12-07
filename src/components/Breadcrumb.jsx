import { useLocation, Link } from "react-router-dom";

const Breadcrumb = ({ padding = "padding-y" }) => {
    let currentLink = "";
    const location = useLocation();
    const crumbs = location.pathname.split("/").filter((link) => link !== "");

    const linkStyle = `ml-2 capitalize opacity-50 after:ml-2 after:content-['/'] last:opacity-100 after:last:content-['']`;

    return (
        <p className={`${padding}`}>
            <Link to="/" className="opacity-50 ">
                Home /
            </Link>

            {crumbs.map((link, index) => {
                currentLink += `/${link}`;
                return (
                    <Link to={currentLink} className={linkStyle} key={index}>
                        {link}
                    </Link>
                );
            })}
        </p>
    );
};

export default Breadcrumb;
