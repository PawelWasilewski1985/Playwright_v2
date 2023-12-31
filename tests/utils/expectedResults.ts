export class ExpectedResults {

    private expectedMessages: string[];

    constructor() {
        this.expectedMessages = [
            "First Name must be between 1 and 32 characters!",
            "Last Name must be between 1 and 32 characters!",
            "E-Mail Address does not appear to be valid!",
            "Telephone must be between 3 and 32 characters!",
            "Password must be between 4 and 20 characters!"
        ];
    }

    public getList(): string[] {
        return this.expectedMessages;
    }


}