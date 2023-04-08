import { Carousel } from "flowbite-react";

function MyCarousel(props) {

    return <div dir="ltr" className="">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                <img
                    src="/img/3c.jpg"
                    alt="..."
                />
                <img
                    src="img/4e.jpg"
                    alt="..."
                />
                <img
                    src="/img/bvlgari.jpg"
                    alt="..."
                />
                <img
                    src="/img/tomford.jpg"
                    alt="..."
                />
                <img
                    src="/img/creed_cms.jpg"
                    alt="..."
                />
            </Carousel>
        </div>
    </div >
}
export default MyCarousel;