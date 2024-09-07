# Contributing to Browser Copy Assistant Project

Thank you for considering contributing to our project! Your contributions are essential to improving the project and making it better for everyone. Below are the guidelines to help you contribute effectively.

## How Can I Contribute?

### 1. Reporting Bugs

If you find a bug, please report it by following these steps:
- **Search existing issues** to ensure the bug has not been reported before.
- If no existing issue exists, create a new one:
  - **Provide a clear and descriptive title**.
  - **Describe the problem** in detail, including the expected and actual behavior.
  - **Include steps to reproduce** the issue, along with relevant code snippets if applicable.
  - **Mention any versions or environments** (e.g., Node.js version, browser version).

### 2. Suggesting Enhancements

We welcome ideas to improve the project. To suggest an enhancement:
- **Open a new issue** and describe your feature request or improvement.
  - Explain the **problem** you're solving.
  - Suggest a **solution** or improvement.
  - Provide **examples or mockups** if necessary.

### 3. Submitting Pull Requests

If you’re ready to contribute code, please follow these steps:

#### Fork the Repository
1. **Fork the repository** to your GitHub account.
2. **Clone your fork** to your local machine:
    ```bash
    git clone https://github.com/your-username/common-js-utils.git
    cd common-js-utils
    ```

#### Set Up Your Environment
3. **Install dependencies**:
    ```bash
    npm install
    ```

#### Create a Branch
4. **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b my-feature-branch
    ```

#### Make Your Changes
5. **Write or update code** in a way that aligns with the project's structure.
    - Ensure **all utilities** are pure, reusable, and well-tested.
    - Keep functions **small and focused**.
    - **Write documentation** for any new utilities in the `README.md`.

#### Write Tests
6. Add tests for your changes in the `tests` directory using [Jest](https://jestjs.io/):
    ```bash
    npm test
    ```
    - Ensure that all tests pass before submitting your PR.

#### Commit and Push Changes
7. **Commit your changes** with a clear and concise commit message:
    ```bash
    git commit -m "Add [utility name] utility"
    ```

8. **Push your branch** to your forked repository:
    ```bash
    git push origin my-feature-branch
    ```

#### Submit the Pull Request
9. Go to your fork on GitHub and create a **pull request**:
    - Describe your changes clearly and reference any related issues.
    - Ensure your pull request follows the project’s **coding standards** and **testing guidelines**.

### 4. Code Standards

- Functions should:
  - Be **well-named** and concise.
  - Be **documented** if they are non-trivial.
  - Be tested with edge cases.
- Use meaningful variable names and avoid abbreviations.
- Write modular and reusable code.

### 5. License

By contributing to this project, you agree that your contributions will be licensed under the [GNU License](./LICENSE).
