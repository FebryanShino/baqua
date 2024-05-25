import {Flex, Space, Typography} from "antd";
import React, {PropsWithChildren, ReactNode} from "react";

const {Title} = Typography;

interface SubSectionProps {
    children: ReactNode;
    title: string;
}

export default function SubSection({children, title}: SubSectionProps) {
    return (
        <>
            <Title className='text-center'>{title}</Title>
            <Flex vertical style={{paddingInline: "2rem"}} gap={10}>
                {children}
            </Flex>
        </>
    );
}
