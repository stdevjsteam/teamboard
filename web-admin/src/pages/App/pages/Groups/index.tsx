import React, { Component } from "react";
import { Table } from "antd";

// import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { groups, entities, common } from "teamboard-store";
// import { Link } from "react-router-dom";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"]
//   }
// ];
type Props = {
  groups: entities.Groups[];
  dispatch: common.Dispatch;
};

class GroupList extends Component<Props> {
  static loadData = ({ store }) => {
    console.log("vay qu araaaaaaaaa");
    return store.dispatch(groups.fetchGroups());
  };
  //   showConfirm = ({ title, id }: entities.InterestingToKnow) => {
  //     const { dispatch } = this.props;

  //     Modal.confirm({
  //       title: `Do you want to delete "${title}" ?`,
  //       onOk() {
  //         dispatch(interestingToKnow.deleteInterestingToKnow(id));
  //       }
  //     });
  //   };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count"
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit</a>
          </span>
        )
      }
    ];
    const data: { key: number; name: string; count: number }[] = [];
    this.props.groups.map((elem, i) => {
      console.log(elem);
      let tablefield = {
        id: i + 1,
        key: i,
        name: elem.name,
        count: elem.users.length
      };
      data.push(tablefield);
    });
    console.log("dfada", data);
    return (
      <div>
        {" "}
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>

      //   <DocumentTitle title="interestingToKnow">
      //     <div>
      //       <Row type="flex" justify="end">
      //         <Col xs={24} md={2}>
      //           <Link
      //             to="/interestingToKnow/add"
      //             style={{
      //               marginBottom: "30px",
      //               display: "block"
      //             }}
      //           >
      //             <Button type="primary" style={{ width: "100%" }}>
      //               Add
      //             </Button>
      //           </Link>
      //         </Col>
      //       </Row>
      //     </div>

      //   </DocumentTitle>
    );
  }
}

export default connect((state: common.StoreState) => {
  return {
    groups: state.groups.list.map(id => state.entities.groups[id])
  };
})(GroupList as any);
