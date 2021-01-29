import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
    // eslint-disable-next-line
  }, []);

  const url = repos.length > 0 ? repos[0].owner.html_url : '!#';

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1 in">
        <i className="fab fa-github"></i> ריפוז אחרונים בגיטהאב
      </h2>{' '}
      {repos.length > 0 && (
        <a
          href={url}
          className="btn btn-light mr"
          target="_blank"
          rel="noreferrer"
        >
          מעבר לפרופיל בגיטהאב
        </a>
      )}
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => (
          <div className="repo bg-white p-1 my-1" key={repo.id} dir="ltr">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              {repo.description && <p>{repo.description}</p>}
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
