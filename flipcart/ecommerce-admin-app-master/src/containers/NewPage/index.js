import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Container, Row, Col,Table } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../actions";


/**
 * @author
 * @function NewPage
 **/

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const [titleValClass, setTitleValClass] = useState("d-none");
  const [categoryIdValClass, setcategoryIdValClass] = useState("d-none");
  const [descValClass, setDescValClass] = useState("d-none");
  const [bannersValClass, setBannersValClass] = useState("d-none");
  const [productsValClass, setProductsValClass] = useState("d-none");
  const dispatch = useDispatch();
  debugger
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    
    console.log(page);
    if (!page.loading) {
      
      setCreateModal(false);
      setTitle("");
      setCategoryId("");
      setDesc("");
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    //e.target.preventDefault();

    // if(title === ""){
    //     alert('Title is required');
    //     setCreateModal(false);
    //     return;
    // }
    
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    debugger
    if (title == "") {
      setTitleValClass("d-block");
      
    } else {
      setTitleValClass("d-none");
    }
    if (desc == "") {
      setDescValClass("d-block");
    } else {
      setDescValClass("d-none");
    }
    if (categoryId == "") {
      setcategoryIdValClass("d-block");
    } else {
      setcategoryIdValClass("d-none");
    }
    if (banners == "") {
      setBannersValClass("d-block");
    } else {
      setBannersValClass("d-none");
    }
    if (products == "") {
      setProductsValClass("d-block");
    } else {
      setProductsValClass("d-none");
    }
    
    if(title == "" || desc == "" || categoryId == "" || banners == "" || products == ""){ 
        setCreateModal(true)
    }else{
      dispatch(createPage(form));
    }
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                                className="form-control"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select> */}
              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder={"Select Category"}
              />
              <span className={categoryIdValClass} id="lblEmail">
                Category is Required
              </span>
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className=""
              />
              <span className={titleValClass} id="lblEmail">
                Title is Required
              </span>
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Desc"}
                className=""
              />
              <span className={descValClass} id="lblEmail">
                Description is Required
              </span>
            </Col>
          </Row>

          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
              <span className={bannersValClass} id="lblEmail">
                banners is Required
              </span>
            </Col>
          </Row>

          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
              <span className={productsValClass} id="lblEmail">
                Product is Required
              </span>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };
  const renderPage = () => {
    debugger
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* {page.length > 0
            ? page.map((pages) => (
                <tr key={page._id}>
                  <td>2</td>
                  <td>{pages.title}</td>
                  <td>{pages.desc}</td>
                </tr>
              ))
            : null} */
          }
        </tbody>
      </Table>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating Page...please wait</p>
      ) : (
        <>
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    {renderPage()}
    </Layout>
  );
};

export default NewPage;
