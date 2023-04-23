import { Box, Card, Rating } from "@mui/material";
import FlexBox from "../../../components/FlexBox";
import { H5, Small } from "../../../components/Typography";
import { number_to_price } from "../../../ultis/Ultis";
import { ProductService } from "../../../network/productService";
import { useEffect, useState } from "react";
const TopSelling = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      await ProductService.getSelling({
        selling: true,
        createdAt: false,
        price: false,
        name: false,
        sort: "desc",
        limit: 4,
      }).then((res) => {
        if (res?.length > 0) {
          setData(res);
        }
      });
    })();
  }, []);
  console.log(data);
  return (
    <Card sx={{ padding: "2rem", height: "100%" }}>
      <H5>Top selling Products</H5>

      {data.length > 0 &&
        data.map((product, index) => (
          <FlexBox key={index} mt="1.2rem">
            <img
              src={product.image}
              alt="Men Keds"
              width="90px"
              height="70px"
              style={{ objectFit: "contain" }}
            />

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              ml="1rem"
            >
              <Small>{product.name}</Small>
              <Small fontWeight={600}>
                {number_to_price(Number(product.price))} đ
              </Small>
            </Box>
          </FlexBox>
        ))}
    </Card>
  );
};

export default TopSelling;
