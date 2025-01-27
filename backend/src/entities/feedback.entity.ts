// Import necessary decorators and types from the TypeORM library
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

// Define the Feedback entity to map to the "feedbacks" table in the database
@Entity("feedbacks")
export class Feedback {
  // Define the primary key column "id", which is automatically generated
  @PrimaryGeneratedColumn()
  id: number;

  // Define a "text" column to store the feedback content, of type text
  @Column({ type: "text" })
  text: string;

  // Define a "sentiment" column to store the sentiment of the feedback, which can be one of three values
  @Column({ type: "varchar", length: 10 })
  sentiment: "Good" | "Bad" | "Neutral";

  // Define a "created_at" column that automatically stores the creation date and time
  @CreateDateColumn()
  created_at: Date;

  // Custom getter to format the "created_at" date when returning from the API
  get formattedCreatedAt(): string {
    // Convert the created_at date to a locale-specific string (MM/DD/YYYY format)
    return this.created_at.toLocaleDateString();
  }
}
