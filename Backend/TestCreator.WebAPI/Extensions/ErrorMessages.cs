namespace TestCreator.WebAPI.Extensions
{
    public static class ErrorMessages
    {
        public const string EmptyEmail = "The email value can not be empty";

        public const string EmptyUserName = "The user name value can not be empty";

        public const string EmptyPassword = "The password value can not be empty";

        public const string EmptyQuestions = "Questions collection can not be empty";

        public const string EmptyTestName = "The test can not be created without the test name";

        public const string InvalidCredentials = "Given credentials are not valid";

        public const string UserExists = "The user with the given credentials already exists";

        public const string ForeignTestId = "The given test id is foreign for the current user";
    }
}
