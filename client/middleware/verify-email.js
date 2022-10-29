export default ({ $auth, redirect }) => {
  console.log("$auth user.isVerified :>> ", $auth.user.isVerified);
  if ($auth.user.isVerified == false) {
    console.log("auth verify emmail");
    return redirect("/auth/login");
  }
};
