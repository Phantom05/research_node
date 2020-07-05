const getUser = document.getElementById("getUser");
const insertUser = document.getElementById("insertUser");
const insertForm = document.getElementById("insertForm");
const deleteUser = document.getElementById("deleteUser");
const deleteForm = document.getElementById("deleteForm");
const updateUser = document.getElementById("updateUser");
const updateForm = document.getElementById("updateForm");

// NOTE: delete
deleteForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("delete");
  const exeptNode = ["BUTTON"];
  const elements = [...this.elements];

  const filterElements = elements.filter(
    (item) => exeptNode.indexOf(item.nodeName) === -1
  );
  const submitConfig = filterElements.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  const hasAllValues = submitConfig.every(
    (item) => item.value.trim().length !== 0
  );
  if (hasAllValues) {
    const submitFormat = _.reduce(
      submitConfig,
      (acc, i) => ((acc[i.name] = i.value), acc),
      {}
    );
    axios.post("/delete", submitFormat).then(({ data }) => {
      console.log(data, "res");
      if (data.result === 1) {
        location.reload();
      } else {
        console.log("삭제 실패");
      }
    });
  }
});

// NOTE: update
updateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("updateUser click");

  e.preventDefault();
  const exeptNode = ["BUTTON"];
  const elements = [...this.elements];

  const filterElements = elements.filter(
    (item) => exeptNode.indexOf(item.nodeName) === -1
  );
  const submitConfig = filterElements.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const submitFormat = _.reduce(
    submitConfig,
    (acc, i) => ((acc[i.name] = i.value), acc),
    {}
  );
  if (submitFormat.userCode.trim().length === 0) {
    console.log("userCode를 입력해주세요.");
  } else {
    console.log(submitFormat);
    axios.post("/update", submitFormat).then(({ data }) => {
      if (data.result === 1) {
        location.reload();
      } else {
        alert("업데이트 실패.");
      }
      console.log(data, "res");
    });
  }
});

// NOTE: get
getUser.addEventListener("click", function () {
  console.log("getUser click");
  axios.get("/getUser").then(({ data }) => {
    console.log(data, "res");
  });
});

// NOTE: insert
insertForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const exeptNode = ["BUTTON"];
  const elements = [...this.elements];

  const filterElements = elements.filter(
    (item) => exeptNode.indexOf(item.nodeName) === -1
  );
  const submitConfig = filterElements.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  const hasAllValues = submitConfig.every(
    (item) => item.value.trim().length !== 0
  );
  if (hasAllValues) {
    console.log(submitConfig, "submitConfig");

    const submitFormat = _.reduce(
      submitConfig,
      (acc, i) => ((acc[i.name] = i.value), acc),
      {}
    );
    axios.post("/insert", submitFormat).then(({ data }) => {
      if (data.result === 1) {
        location.reload();
      } else {
        alert("중복입니다.");
      }
      console.log(data, "res");
    });
  } else {
    alert("모두 입력해주세요.");
  }
});
