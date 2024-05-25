import {LoadingOutlined} from "@ant-design/icons";
import {Button, Card, Flex, Popover, Space, Typography} from "antd";
import React from "react";

const {Title, Text, Paragraph} = Typography;

export default function AlbumGrid({data}: any) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
                gridAutoFlow: "dense",
                gridGap: ".5rem",
            }}
        >
            {data
                .filter((album: any) => album.wrapperType === "collection")
                .map((item: any, index: number) => (
                    <Popover
                        content={
                            <Card title={item.collectionName}>
                                <Space
                                    direction='vertical'
                                    style={{width: "100%"}}
                                >
                                    <Text>Tracks</Text>
                                    {data
                                        .filter(
                                            (track: any) =>
                                                track.wrapperType === "track" &&
                                                track.collectionId ===
                                                    item.collectionId
                                        )
                                        .map((track: any, index: number) => (
                                            <Flex
                                                justify='space-between'
                                                style={{paddingLeft: 15}}
                                            >
                                                <Text>
                                                    {track.trackCensoredName}
                                                </Text>
                                                <Button
                                                    shape='circle'
                                                    href={track.previewUrl}
                                                    icon={<LoadingOutlined />}
                                                ></Button>
                                            </Flex>
                                        ))}
                                    <Button
                                        style={{padding: 0}}
                                        type='link'
                                        href={item.collectionViewUrl}
                                    >
                                        Details
                                    </Button>
                                </Space>
                            </Card>
                        }
                    >
                        <Card
                            // style={{width: 200, height: 300}}
                            cover={
                                <img
                                    src={item.artworkUrl100?.replace(
                                        "100x100",
                                        "500x500"
                                    )}
                                />
                            }
                            key={index}
                        >
                            <Text className='text-center'>
                                {item.collectionName}
                            </Text>
                        </Card>
                    </Popover>
                ))}
        </div>
    );
}
