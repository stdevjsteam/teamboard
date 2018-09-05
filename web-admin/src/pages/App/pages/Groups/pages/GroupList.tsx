// import React, { Component } from "react";
// import { List, Button, Row, Col } from "antd";
// import DocumentTitle from "react-document-title";
// import { connect } from "react-redux";
// import { groups, entities, common } from "teamboard-store";
// import { Link } from "react-router-dom";

// type Props = {
//   groups: entities.Groups[];
//   dispatch: common.Dispatch;
// };

// class GroupList extends Component<Props> {
//   //   showConfirm = ({ title, id }: entities.InterestingToKnow) => {
//   //     const { dispatch } = this.props;

//   //     Modal.confirm({
//   //       title: `Do you want to delete "${title}" ?`,
//   //       onOk() {
//   //         dispatch(interestingToKnow.deleteInterestingToKnow(id));
//   //       }
//   //     });
//   //   };

//   render() {
//     console.log("dfada", this.props);
//     return (
//       <DocumentTitle title="interestingToKnow">
//         <div>
//           <Row type="flex" justify="end">
//             <Col xs={24} md={2}>
//               <Link
//                 to="/interestingToKnow/add"
//                 style={{
//                   marginBottom: "30px",
//                   display: "block"
//                 }}
//               >
//                 <Button type="primary" style={{ width: "100%" }}>
//                   Add
//                 </Button>
//               </Link>
//             </Col>
//           </Row>

//           <List
//             className="demo-loadmore-list"
//             loading={false}
//             itemLayout="horizontal"
//             dataSource={this.props.groups}
//             renderItem={item => (
//               <List.Item
//                 actions={[
//                   <Link to={`/interestingToKnow/${item.id}/edit`}>edit</Link>,
//                   <a
//                     onClick={() => {
//                       console.log();
//                     }}
//                   >
//                     delete
//                   </a>
//                 ]}
//               >
//                 <List.Item.Meta title={<span>{item.title}</span>} />
//               </List.Item>
//             )}
//           />
//         </div>
//       </DocumentTitle>
//     );
//   }
// }

// export default connect((state: common.StoreState) => {
//   return {
//     groups: state.groups.list.map(id => state.entities.groups[id])
//   };
// })(GroupList as any);
