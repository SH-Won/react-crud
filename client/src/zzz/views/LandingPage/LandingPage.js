import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getFirstProduct,
  getProduct,
  deleteProduct,
  getFilterProduct,
  getSearchProduct,
  updateView,
} from "../../../_actions/product_actions";
import ImageSlider from "../../util/ImageSlider";
import { category } from "./Datas/Datas";
import CheckBox from "./Section/CheckBox";
import SearchBar from "./Section/SearchBar";
const { Meta } = Card;

function LandingPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.upload.products, [
    (state) => state.upload.products,
  ]);
  const postSize = useSelector((state) => state.upload.postSize, []);

  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [Products, setProducts] = useState([]);
  const [LoadMore, setLoadMore] = useState(false);
  const user = localStorage.getItem("userId");
  const userId = useSelector((state) => state.user);

  const [Filters, setFilters] = useState({
    category: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getFirstProduct(Skip, Limit, Filters, SearchTerm));

    //  dispatch(getProduct(Skip,Limit,Filters,SearchTerm))
  }, [dispatch]);
  console.log(Products);
  console.log(LoadMore);

  const loadMore = (e) => {
    e.preventDefault();
    let skip = Skip + Limit;
    let limit = Limit;

    let filters = Filters;
    let searchTerm = SearchTerm;

    dispatch(getProduct(skip, limit, filters, searchTerm));

    setSkip(skip);
    setLoadMore(true);
  };
  //console.log(Skip,Limit);
  const deleteProducts = (product_id, writer, product) => {
    // const current = products.indexOf(product)
    //  let newProducts = [...products]

    console.log("인덱스:", products.indexOf(product));
    let filters = Filters;
    let searchTerm = SearchTerm;

    alert("정말로 삭제하시겠습니까?");
    dispatch(
      deleteProduct(product_id, writer, Skip, Limit, filters, searchTerm)
    ).then((response) => {
      if (response.payload.success) {
        console.log("delete");
        setSkip(Skip);
        //  products.splice(current,1)
      }
    });
  };
  console.log(products, `포스트사이즈:${postSize}`);
  console.log(`스킵:${Skip} limit:${Limit}`);

  const viewCount = (productId, views) => {
    let variable = {
      productId: productId,
      views: views,
    };
    dispatch(updateView(variable));
  };

  const renderCard =
    products.length > 0 &&
    products.map((product, index) => {
      const deleteButton =
        userId.userData.isAuth && user === product.writer._id
          ? [
              <Button
                onClick={() =>
                  deleteProducts(product._id, product.writer, product)
                }
              >
                {" "}
                삭제{" "}
              </Button>,
            ]
          : [<Button>좋아요</Button>];

      return (
        <Col key={`${product._id}+${index}`} lg={6} md={8} xs={24}>
          <Card
            hoverable={true}
            cover={
              <a
                onClick={() => viewCount(product._id, product.views)}
                href={`/product/${product._id}`}
              >
                <ImageSlider images={product.images} />
              </a>
            }
            actions={deleteButton}
          >
            <Meta
              title={product.title}
              description={`${product.writer.name}  ${product.category}  조회수 : ${product.views}`}
            />
          </Card>
        </Col>
      );
    });

  const handleFilter = (filters, category) => {
    let newFilters = { ...Filters };
    newFilters[category] = filters;

    setFilters(newFilters);
    showFilterResult(newFilters);
  };
  const showFilterResult = (filters) => {
    let skip = 0;
    let limit = Limit;
    let filter = filters;
    let searchTerm = SearchTerm;
    // dispatch(getFilterProduct(skip,limit,filter,searchTerm))
    dispatch(getFirstProduct(skip, limit, filter, searchTerm));
    setSkip(0);
  };
  const searchFilter = (searchTerm) => {
    setSearchTerm(searchTerm);
    let skip = 0;
    let limit = Limit;
    let filter = Filters;
    let term = searchTerm;
    // dispatch(getSearchProduct(skip,limit,filter,term))
    dispatch(getFirstProduct(skip, limit, filter, searchTerm));
    setSkip(0);
  };

  return (
    <div style={{ width: "90%", margin: "2rem auto" }}>
      <CheckBox
        list={category}
        handleFilter={(filters) => handleFilter(filters, "category")}
      />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchBar searchFilter={searchFilter} />
      </div>
      <br />
      <br />
      {products.length === 0 ? (
        <div>게시글을 불러오는 중입니다</div>
      ) : (
        <Row gutter={[16, 16]}>{renderCard}</Row>
      )}
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {postSize >= Limit && (
          <Button onClick={loadMore}> 게시글 더보기 </Button>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
