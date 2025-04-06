export class Event {
    public propragating: boolean = true;

    public stopPropagating() {
        this.propragating = false;
    }
}