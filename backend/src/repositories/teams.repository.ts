import { pool } from '../config/database';
import { Team, Service, CreateTeamRequest } from '../types';

export class TeamsRepository {
  async findAll(): Promise<Team[]> {
    const result = await pool.query('SELECT * FROM teams ORDER BY created_at DESC');
    return result.rows;
  }

  async findById(id: string): Promise<Team | null> {
    const result = await pool.query('SELECT * FROM teams WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(team: CreateTeamRequest): Promise<Team> {
    const query = `
      INSERT INTO teams (name, owner, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [
      team.name,
      team.owner,
      team.description
    ]);
    return result.rows[0];
  }

  async findServicesByTeamId(teamId: string): Promise<Service[]> {
    const result = await pool.query(
      'SELECT * FROM services WHERE team_id = $1 ORDER BY created_at DESC',
      [teamId]
    );
    return result.rows;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM teams WHERE id = $1', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
}
