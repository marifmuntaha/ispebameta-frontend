import React from "react";
import Head from "../../layout/head";
import {Button} from "reactstrap";
import {Block, Icon} from "../../components";
import Content from "../../layout/content";

const Print = () => {
    return <>
        <body className="bg-white" style={{margin: 0}}>
        <Head title="Invoice Print"></Head>
        <Content>
            <Block>
                <div className="invoice invoice-print">
                    <div className="invoice-action">
                        <Button
                            size="lg"
                            color="primary"
                            outline
                            className="btn-icon btn-white btn-dim"
                            onClick={() => window.print()}
                        >
                            <Icon name="printer-fill"></Icon>
                        </Button>
                    </div>
                    <div className="invoice-wrap">
                        <div className="invoice-brand text-center">
                            <span className="fw-bold fs-18px">
                                KEMENTRIAN AGAMA REPUBLIK INDONESIA
                            </span>
                            <br/>
                            <span className="fw-bold fs-18px">
                                KEMENTRIAN AGAMA KABUPATEN JEPARA
                            </span>
                            <br/>
                            <span className="fs-12px">
                                Jl. Ratu Kalinyamat, Demaan VI, Demaan, Kec. Jepara, Kabupaten Jepara, Jawa Tengah
                            </span>
                            <hr/>
                        </div>
                        <div className="invoice-brand text-center">
                            <span className="fw-bold fs-16px">
                                INSTRUMEN SUPERVISI AKADEMIK TAHUN 2024
                            </span>
                            <br/>
                            <span className="fw-bold fs-16px">
                                PERENCANAAN PEMBELAJARAN DI MADRASAH
                            </span>
                        </div>
                        <div className="invoice-head">
                            <div className="invoice-contact">
                                <table className="table table-sm table-borderless list-plain">
                                    <tbody>
                                    <tr>
                                        <td>Nama Guru</td>
                                        <td>:</td>
                                        <td>Muhammad Arif Muntaha</td>
                                    </tr>
                                    <tr>
                                        <td>Tugas Tambahan</td>
                                        <td>:</td>
                                        <td>Wali Kelas</td>
                                    </tr>
                                    <tr>
                                        <td>Mata Pelajaran</td>
                                        <td>:</td>
                                        <td>Geografi</td>
                                    </tr>
                                    <tr>
                                        <td>Nama Madrasah</td>
                                        <td>:</td>
                                        <td>MTs. Darul Hikmah Menganti</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="invoice-bills">
                            <div className="table-responsive">
                            <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="w-150px">Item ID</th>
                                        <th className="w-60">Description</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                    <td>24108054</td>
                                        <td>Dashlite - Conceptual App Dashboard - Regular License</td>
                                        <td>asdada</td>
                                        <td>1</td>
                                        <td>asdadad</td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colSpan="2"></td>
                                        <td colSpan="2">Processing fee</td>
                                        <td>$10.00</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"></td>
                                        <td colSpan="2">TAX</td>
                                        <td>$50.00</td>
                                    </tr>
                                    </tfoot>
                                </table>
                                <div className="nk-notes ff-italic fs-12px text-soft">
                                    Invoice was created on a computer and is valid without the signature and seal.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Block>
        </Content>
        </body>
    </>
}
export default Print;