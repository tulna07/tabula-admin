/**
 * Helpers
 *
 ********************************************/
const getElem = id => document.getElementById(id);

const service = new Service();
const validation = new Validation();

function renderHTML(data) {
  let content = "";
  for (let i = 0; i < data.length; ++i) {
    const user = data[i];
    content += `
      <tr>
        <td>${i + 1}</td>
        <td class="user-account">${user.account}</td>
        <td>${user.password}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.language}</td>
        <td>${user.userType}</td>
        <td>
          <button 
            class="btn btn-warning" 
            onclick="displayUserInfoToInput(${user.id});"
            data-toggle="modal"
            data-target="#myModal"
          >
            Edit
          </button>
          <button 
            class="btn btn-danger" 
            onclick="deleteUser(${user.id});"
          >
            X
          </button>
        </td>
      </tr>
    `;
  }

  getElem("tblDanhSachNguoiDung").innerHTML = content;
}

function isValidUserInput(
  account,
  fullName,
  password,
  email,
  image,
  userType,
  language,
  description
) {
  let isValid = true;

  // Validate user account
  isValid &= validation.isValid(
    isEmpty,
    account,
    "tbTKNV",
    "(*) Vui lòng không để trống tài khoản người dùng"
  );

  // Validate user name
  isValid &=
    validation.isValid(
      isEmpty,
      fullName,
      "tbTen",
      "(*) Vui lòng không để trống tên người dùng"
    ) &&
    validation.isValid(
      isValidPattern,
      fullName,
      "tbTen",
      "(*) Tên người dùng phải là chữ",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

  // Validate user password
  isValid &=
    validation.isValid(
      isEmpty,
      password,
      "tbMatKhau",
      "(*) Vui lòng không để trống mật khẩu"
    ) &&
    validation.isValid(
      isValidLength,
      password,
      "tbMatKhau",
      "(*) Mật khẩu phải từ 6 - 8 ký tự",
      [6, 8]
    ) &&
    validation.isValid(
      isValidPattern,
      password,
      "tbMatKhau",
      "(*) Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt",
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    );

  // Validate user email
  isValid &=
    validation.isValid(
      isEmpty,
      email,
      "tbEmail",
      "(*) Vui lòng không để trống email"
    ) &&
    validation.isValid(
      isValidPattern,
      email,
      "tbEmail",
      "Email không đúng định dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

  // Validate user image
  isValid &= validation.isValid(
    isEmpty,
    image,
    "tbHinhAnh",
    "(*) Vui lòng không để trống hình ảnh"
  );

  // Validate user type
  isValid &= validation.isValid(
    value => value !== "Choose User Type",
    userType,
    "tbLoaiNguoiDung",
    "(*) Vui lòng chọn loại người dùng hợp lệ"
  );

  // Validate user language
  isValid &= validation.isValid(
    value => value !== "Choose Language",
    language,
    "tbNgonNgu",
    "(*) Vui lòng chọn ngôn ngữ hợp lệ"
  );

  // Validate user description
  isValid &=
    validation.isValid(
      isEmpty,
      description,
      "tbMieuTa",
      "(*) Vui lòng không để trống miêu tả"
    ) &&
    validation.isValid(
      isValidLength,
      description,
      "tbMieuTa",
      "(*) Miêu tả không vượt quá 60 ký tự",
      [0, 60]
    );

  return isValid;
}

function getUserInput() {
  const account = getElem("TaiKhoan").value;
  const fullName = getElem("HoTen").value;
  const password = getElem("MatKhau").value;
  const email = getElem("Email").value;
  const image = getElem("HinhAnh").value;
  const userType = getElem("loaiNguoiDung").value;
  const language = getElem("loaiNgonNgu").value;
  const description = getElem("MoTa").value;

  if (
    !isValidUserInput(
      account,
      fullName,
      password,
      email,
      image,
      userType,
      language,
      description
    )
  )
    return null;

  return new User(
    account,
    fullName,
    password,
    email,
    image,
    userType,
    language,
    description
  );
}

function displayUserInfoToInput(id) {
  getElem("modal-title").innerHTML = "Update User";
  getElem(
    "modal-footer"
  ).innerHTML = `<button class="btn btn-info" onclick="updateUser(${id});">Update</button>`;
  getElem("TaiKhoan").disabled = true;

  service
    .getUserById(id)
    .then(response => {
      const user = response.data;
      getElem("TaiKhoan").value = user.account;
      getElem("HoTen").value = user.fullName;
      getElem("MatKhau").value = user.password;
      getElem("Email").value = user.email;
      getElem("HinhAnh").value = user.image;
      getElem("loaiNguoiDung").value = user.userType;
      getElem("loaiNgonNgu").value = user.language;
      getElem("MoTa").value = user.description;
    })
    .catch(err => console.log(err));
}

/**
 * Main Functionalities
 *
 ********************************************/
const showUserList = () =>
  service
    .fetchData()
    .then(response => renderHTML(response.data))
    .catch(err => console.log(err));
showUserList();

const addUser = () => {
  const user = getUserInput();
  if (
    !user ||
    !validation.isValid(
      isAccountNonExist,
      user.account,
      "tbTKNV",
      "(*) Tài khoản này đã tồn tại"
    )
  )
    return;

  service
    .addUser(user)
    .then(() => {
      showUserList();
      getElem("btn-close-modal").click();
    })
    .catch(err => console.log(err));
};

const deleteUser = id =>
  service
    .deleteUserById(id)
    .then(() => showUserList())
    .catch(err => console.log(err));

const updateUser = id => {
  const user = getUserInput();
  if (!user) return;

  service
    .updateUserById(id, user)
    .then(() => {
      showUserList();
      getElem("btn-close-modal").click();
    })
    .catch(err => console.log(err));
};

getElem("btnThemNguoiDung").addEventListener("click", () => {
  getElem("modal-title").innerHTML = "Add User";
  getElem("modal-footer").innerHTML =
    '<button class="btn btn-primary" onclick="addUser();">Add</button>';
  getElem("TaiKhoan").disabled = false;

  // Clear user input
  getElem("TaiKhoan").value = "";
  getElem("HoTen").value = "";
  getElem("MatKhau").value = "";
  getElem("Email").value = "";
  getElem("HinhAnh").value = "";
  getElem("loaiNguoiDung").value = "";
  getElem("loaiNgonNgu").value = "";
  getElem("MoTa").value = "";
});
