import React, {useState} from "react";
import { Button, Card,Row,Col  } from "antd";
import { PrinterOutlined} from "@ant-design/icons";
import QRCode from "react-qr-code";
import { useURLQrCode } from "../../hooks/useURLQrCode";
import "./JobPacking.css";
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const print_QR_Code = () => {
  window.print();
  window.close();
};
const gridStyle: React.CSSProperties = {
  width: "33.3%",
  textAlign: "center",
  height: "100%",
  paddingTop: "20px",
  paddingLeft: "5px",
  paddingRight: "5px",
  boxShadow: "1px 1px 1px #fff",
};



const QrCodePrint: React.FC<any> = (props) => {

const obj = JSON.parse(localStorage.getItem("qr") || "{}");
console.log(obj);

const {
  data: URLQrCode,
} = useURLQrCode();

  return (
    <>
    
      <div className="print-source print-preview ">
        <div className="no-print">
          <Button
            type="primary"
            className="btn-info"
            onClick={print_QR_Code}
            style={{
              marginBottom: 8,
              marginTop: 8,
              marginLeft: 8,
            }}
          >
            <PrinterOutlined />
            Print
          </Button>
        </div>
        {obj.map((item: any) => {
          const object = [
            { QR_NO: item.QR_NO, 
              Tag_ID: item.Tag_ID, 
              Item_ID: item.Item_ID,
              Series:item.Series || null,
            },
          ];
          const codeJson = JSON.stringify(object);
          let text = '';

          let encoded = base64_encode(codeJson);
          let url_name = URLQrCode?.data.data[0].URL_Name;
          const url_qr = url_name+"/toto_warranty/service?info="+encoded;
          //const url_qr = "https://as-spare-part.ttlsystem.com:5001/toto_warranty/service?info="+encoded;

          if(item.Product_ID == 4){
            text = item.Lot_No + ' (' + item.Series + ')';
          }
          else{
            text = item.Lot_No;
          }

          return (
            <>
              <Card.Grid style={gridStyle}>
                <div style={{marginTop:-22}}>
                  <div>
                    <text className="labelItem">{item.ITEM_CODE}</text>
                  </div>
                  <div style={{marginTop:-15}}>
                    <text className="labels">{"QR Code : "}{item.QR_NO}</text>
                  </div>
                  <div style={{marginLeft:32}}>
                    <QRCode
                        value={url_qr}
                        size={210}
                        style={{ height: "auto", maxWidth: "100%", width: "80%" }}
                        viewBox={`0 0 256 256`}
                      />
                  </div>
                  <div style={{marginTop:-20}}>
                    <text className="labels">{"Lot No : "}{text}</text>
                  </div>
                  
                </div>
              </Card.Grid>
              
            </>
          );
        })}

      </div>
    </>
  );
};

export default QrCodePrint;
