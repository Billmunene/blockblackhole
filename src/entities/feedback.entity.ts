import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("feedbacks")
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "varchar", length: 10 })
  sentiment: "Good" | "Bad" | "Neutral";

  @CreateDateColumn()
  created_at: Date;

  // Custom getter to format the created_at date when returning from the API
  get formattedCreatedAt(): string {
    return this.created_at.toLocaleDateString(); // Format to only show date (MM/DD/YYYY)
  }
}
