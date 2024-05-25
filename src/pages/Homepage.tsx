import React, {useEffect, useState} from "react";
import {fetchData} from "../api/danbooru";
import {
    Button,
    Card,
    Carousel,
    Divider,
    Flex,
    Grid,
    Image,
    Popover,
    Select,
    Space,
    Typography,
} from "antd";
import SubSection from "../components/SubSection";
import fetchItunesAlbums from "../api/itunes";
import AlbumGrid from "../components/AlbumGrid";

const youtubeData = require("../data/videos.json");
const {Title, Text, Paragraph} = Typography;

const costumes = [
    "https://cdn.donmai.us/sample/48/90/__minato_aqua_and_minato_aqua_hololive_drawn_by_gaou_umaiyo_puyoman__sample-48901505cb07a851f50603d57cb48f58.jpg",
    "https://cdn.donmai.us/sample/48/90/__minato_aqua_and_minato_aqua_hololive_drawn_by_gaou_umaiyo_puyoman__sample-48901505cb07a851f50603d57cb48f58.jpg",
    "https://cdn.donmai.us/sample/48/90/__minato_aqua_and_minato_aqua_hololive_drawn_by_gaou_umaiyo_puyoman__sample-48901505cb07a851f50603d57cb48f58.jpg",
    "https://cdn.donmai.us/sample/48/90/__minato_aqua_and_minato_aqua_hololive_drawn_by_gaou_umaiyo_puyoman__sample-48901505cb07a851f50603d57cb48f58.jpg",
];

function paginate(array: any, page_size: number, page_number: number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export default function Homepage() {
    const [images, setImages] = useState<any[]>([]);
    const [albums, setAlbums] = useState<any[]>([]);
    const [currentVideoPage, setCurrentVideoPage] = useState<number>(1);
    useEffect(() => {
        fetchData("minato_aqua+rating:g+order:score+filetype:png").then(
            (data) => {
                setImages(data);
            }
        );
        fetchItunesAlbums("1528261915").then((data) => {
            setAlbums(data.results);
            console.log(data);
        });
    }, []);
    return (
        <div>
            <Carousel
                className='overflow-hidden'
                style={{
                    height: "20rem",
                    zIndex: -1,
                }}
                autoplay
            >
                {images.map((item) => (
                    <img key={item.id} src={item.large_file_url} />
                ))}
            </Carousel>
            <Flex
                style={{zIndex: 1, marginTop: "-15%", padding: 20}}
                align='center'
                justify='space-evenly'
            >
                <Image style={{width: "15rem"}} src='/baqua.webp' />
                <Space direction='vertical'>
                    <Title>Who's Minato Aqua?</Title>
                    <Text>She's god</Text>
                </Space>
            </Flex>
            <SubSection title='YouTube'>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(14rem, 1fr))",
                        gridAutoFlow: "dense",
                        gridGap: ".5rem",
                    }}
                >
                    {paginate(youtubeData.items, 6, currentVideoPage).map(
                        (item: any) => (
                            <Card
                                style={{height: 300}}
                                hoverable
                                cover={
                                    <img
                                        src={item.snippet.thumbnails.maxres.url}
                                    />
                                }
                            >
                                <Text style={{fontSize: 10}}>
                                    {item.snippet.title}
                                </Text>
                            </Card>
                        )
                    )}
                </div>
                <Flex justify='center' align='center' gap={10}>
                    <Button
                        onClick={() =>
                            setCurrentVideoPage(currentVideoPage - 1)
                        }
                        disabled={currentVideoPage === 1}
                    >
                        Previous Page
                    </Button>

                    <Text>Page {currentVideoPage}</Text>
                    <Button
                        onClick={() =>
                            setCurrentVideoPage(currentVideoPage + 1)
                        }
                        disabled={currentVideoPage === 4}
                    >
                        Next Page
                    </Button>
                </Flex>
            </SubSection>
            <Divider />
            <SubSection title='Album'>
                <AlbumGrid data={albums} />
            </SubSection>
            <Divider />
            <SubSection title='Artworks'>
                <Flex justify='space-between'>
                    <Popover
                        content={
                            <Space wrap>
                                {costumes.map((item, index) => (
                                    <Card
                                        key={index}
                                        cover={<img src={item} />}
                                        style={{width: 150}}
                                        hoverable
                                    >
                                        Costume {index + 1}
                                    </Card>
                                ))}
                            </Space>
                        }
                    >
                        <Button>Costume</Button>
                    </Popover>
                    <Select
                        defaultValue='lucy'
                        style={{width: 120}}
                        options={[
                            {value: "jack", label: "Date"},
                            {value: "lucy", label: "Lucy"},
                            {value: "Yiminghe", label: "yiminghe"},
                            {
                                value: "disabled",
                                label: "Disabled",
                                disabled: true,
                            },
                        ]}
                    />
                </Flex>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(8rem, 1fr))",
                        gridAutoFlow: "dense",
                        gridGap: ".5rem",
                    }}
                >
                    {images.map((item) => (
                        <Popover
                            title={"By " + item.tag_string_artist}
                            content={
                                <Card
                                    style={{width: 200}}
                                    cover={<img src={item.large_file_url} />}
                                >
                                    <Button type='link' href={item.source}>
                                        Open
                                    </Button>
                                </Card>
                            }
                        >
                            <div
                                key={item.id}
                                style={{
                                    backgroundImage: `url(${item.large_file_url})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center 0",
                                    overflow: "hidden",
                                }}
                                className={
                                    item.image_width < item.image_height
                                        ? "portrait"
                                        : item.image_width > item.image_height
                                        ? "landscape"
                                        : "square"
                                }
                            ></div>
                        </Popover>
                    ))}
                </div>
            </SubSection>
        </div>
    );
}
