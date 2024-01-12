import React from "react";
import Content from "../../layout/content";
import Head from "../../layout/head";
import {Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, PreviewAltCard, Row} from "../../components";

const Dashboard = () => {
    return (
        <>
            <Head title="Dashboard"/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Dashboard
                            </BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row>
                        <Col md="4">
                            <PreviewAltCard>
                            </PreviewAltCard>
                        </Col>
                        <Col md="8">
                        </Col>
                    </Row>
                </Block>
            </Content>
        </>
    );
};

export default Dashboard;
