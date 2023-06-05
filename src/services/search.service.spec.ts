import { TestBed } from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing"
import { SearchService } from "./search.service"
import { Repository } from "src/app/repo/repo.model"
import { Response } from "./search.model"

describe("SearchService", () => {
  let service: SearchService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: service, useClass: SearchService }],
    })
    service = TestBed.inject(SearchService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it("#queryParams should be init with initial values", () => {
    const queryParams = service.getQueryParams()
    const initialQueryParams = { page: 1, per_page: 5 }
    expect(queryParams).toEqual(initialQueryParams)
  })

  it("#currentPage should be init with initial values", () => {
    expect(service.getCurrentPage()).toEqual(1)
  })

  it("#setCurrentPage should be set currentPage to 20", () => {
    service.setCurrentPage(20)
    expect(service.getCurrentPage()).toEqual(20)
  })

  it("#setSearch should be set #search to Repository", () => {
    service.setSearch("Repository")
    expect(service.getSearch()).toEqual("Repository")
  })

  it("#setSearchSaved should be set #searchSaved to Repository", () => {
    service.setSearchSaved("Repository")
    expect(service.getSearchSaved()).toEqual("Repository")
  })

  it("#setTrueForIsFirstSearch should be set isFirstSearch to true", () => {
    service.setTrueForIsFirstSearch()
    expect(service.getIsFirstSearch()).toEqual(true)
  })

  it("#myReposHttp should be working and be returning #Response modal", () => {
    const expectedUrl =
      "https://api.github.com/search/repositories?q=+user:otaviusedano&page=1&per_page=5"

    const expectedRepos: Repository = {
      id: 417695271,
      node_id: "R_kgDOGOWGJw",
      name: "BeautySalon",
      full_name: "otaviusedano/BeautySalon",
      private: false,
      allow_forking: false,
      archive_url: "",
      archived: false,
      assignees_url: "",
      blobs_url: "",
      branches_url: "",
      clone_url: "",
      collaborators_url: "",
      comments_url: "",
      commits_url: "",
      compare_url: "",
      contents_url: "",
      contributors_url: "",
      created_at: "",
      default_branch: "",
      deployments_url: "",
      description: null,
      disabled: false,
      downloads_url: "",
      events_url: "",
      fork: false,
      forks: 0,
      forks_count: 0,
      forks_url: "",
      git_commits_url: "",
      git_refs_url: "",
      git_tags_url: "",
      git_url: "",
      has_discussions: false,
      has_downloads: false,
      has_issues: false,
      has_pages: false,
      has_projects: false,
      has_wiki: false,
      homepage: "",
      hooks_url: "",
      html_url: "",
      is_template: false,
      issue_comment_url: "",
      issue_events_url: "",
      issues_url: "",
      keys_url: "",
      labels_url: "",
      language: "",
      languages_url: "",
      license: null,
      merges_url: "",
      milestones_url: "",
      mirror_url: null,
      notifications_url: "",
      open_issues: 0,
      open_issues_count: 0,
      pulls_url: "",
      pushed_at: "",
      releases_url: "",
      score: undefined,
      size: 0,
      ssh_url: "",
      stargazers_count: 0,
      stargazers_url: "",
      statuses_url: "",
      subscribers_url: "",
      subscription_url: "",
      svn_url: "",
      tags_url: "",
      teams_url: "",
      trees_url: "",
      updated_at: "",
      url: "",
      visibility: "",
      watchers: 0,
      watchers_count: 0,
      web_commit_signoff_required: false,
      owner: {
        login: "",
        id: 0,
        node_id: "",
        avatar_url: "",
        gravatar_id: "",
        url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "",
        site_admin: false,
      },
    }

    const expectedResponse: Response = {
      incomplete_results: false,
      items: [expectedRepos],
      total_count: 1,
    }

    service.myReposHttp().subscribe((res: Response) => {
      expect(res.incomplete_results).not.toBeTrue()
      expect(res.items).toContain(expectedRepos)
      expect(res.total_count).toEqual(expectedResponse.items.length)
    })

    const req = httpMock.expectOne(expectedUrl)
    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it("#repoCountSubject should be equal to #Response.total_count", () => {
    const expectedUrl =
      "https://api.github.com/search/repositories?q=+user:otaviusedano&page=1&per_page=5"

    const expectedRepos: Repository = {
      id: 417695271,
      node_id: "R_kgDOGOWGJw",
      name: "BeautySalon",
      full_name: "otaviusedano/BeautySalon",
      private: false,
      allow_forking: false,
      archive_url: "",
      archived: false,
      assignees_url: "",
      blobs_url: "",
      branches_url: "",
      clone_url: "",
      collaborators_url: "",
      comments_url: "",
      commits_url: "",
      compare_url: "",
      contents_url: "",
      contributors_url: "",
      created_at: "",
      default_branch: "",
      deployments_url: "",
      description: null,
      disabled: false,
      downloads_url: "",
      events_url: "",
      fork: false,
      forks: 0,
      forks_count: 0,
      forks_url: "",
      git_commits_url: "",
      git_refs_url: "",
      git_tags_url: "",
      git_url: "",
      has_discussions: false,
      has_downloads: false,
      has_issues: false,
      has_pages: false,
      has_projects: false,
      has_wiki: false,
      homepage: "",
      hooks_url: "",
      html_url: "",
      is_template: false,
      issue_comment_url: "",
      issue_events_url: "",
      issues_url: "",
      keys_url: "",
      labels_url: "",
      language: "",
      languages_url: "",
      license: null,
      merges_url: "",
      milestones_url: "",
      mirror_url: null,
      notifications_url: "",
      open_issues: 0,
      open_issues_count: 0,
      pulls_url: "",
      pushed_at: "",
      releases_url: "",
      score: undefined,
      size: 0,
      ssh_url: "",
      stargazers_count: 0,
      stargazers_url: "",
      statuses_url: "",
      subscribers_url: "",
      subscription_url: "",
      svn_url: "",
      tags_url: "",
      teams_url: "",
      trees_url: "",
      updated_at: "",
      url: "",
      visibility: "",
      watchers: 0,
      watchers_count: 0,
      web_commit_signoff_required: false,
      owner: {
        login: "",
        id: 0,
        node_id: "",
        avatar_url: "",
        gravatar_id: "",
        url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "",
        site_admin: false,
      },
    }

    const expectedResponse: Response = {
      incomplete_results: false,
      items: [expectedRepos],
      total_count: 1,
    }

    service.myReposHttp().subscribe((resFromHttp: Response) => {
      service.getRepoCount().subscribe((resFromBehaviorSubject: number) => {
        expect(resFromBehaviorSubject).toEqual(resFromHttp.total_count)
      })
    })

    const req = httpMock.expectOne(expectedUrl)
    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it("#reposFromSearchHttp should be working and be returning #Response modal", () => {
    const expectedUrl =
      "https://api.github.com/search/repositories?q=in:name%20just for test&page=1&per_page=5"

    const expectedRepos: Repository = {
      id: 417695271,
      node_id: "R_kgDOGOWGJw",
      name: "BeautySalon",
      full_name: "otaviusedano/BeautySalon",
      private: false,
      allow_forking: false,
      archive_url: "",
      archived: false,
      assignees_url: "",
      blobs_url: "",
      branches_url: "",
      clone_url: "",
      collaborators_url: "",
      comments_url: "",
      commits_url: "",
      compare_url: "",
      contents_url: "",
      contributors_url: "",
      created_at: "",
      default_branch: "",
      deployments_url: "",
      description: null,
      disabled: false,
      downloads_url: "",
      events_url: "",
      fork: false,
      forks: 0,
      forks_count: 0,
      forks_url: "",
      git_commits_url: "",
      git_refs_url: "",
      git_tags_url: "",
      git_url: "",
      has_discussions: false,
      has_downloads: false,
      has_issues: false,
      has_pages: false,
      has_projects: false,
      has_wiki: false,
      homepage: "",
      hooks_url: "",
      html_url: "",
      is_template: false,
      issue_comment_url: "",
      issue_events_url: "",
      issues_url: "",
      keys_url: "",
      labels_url: "",
      language: "",
      languages_url: "",
      license: null,
      merges_url: "",
      milestones_url: "",
      mirror_url: null,
      notifications_url: "",
      open_issues: 0,
      open_issues_count: 0,
      pulls_url: "",
      pushed_at: "",
      releases_url: "",
      score: undefined,
      size: 0,
      ssh_url: "",
      stargazers_count: 0,
      stargazers_url: "",
      statuses_url: "",
      subscribers_url: "",
      subscription_url: "",
      svn_url: "",
      tags_url: "",
      teams_url: "",
      trees_url: "",
      updated_at: "",
      url: "",
      visibility: "",
      watchers: 0,
      watchers_count: 0,
      web_commit_signoff_required: false,
      owner: {
        login: "",
        id: 0,
        node_id: "",
        avatar_url: "",
        gravatar_id: "",
        url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "",
        site_admin: false,
      },
    }

    const expectedResponse: Response = {
      incomplete_results: false,
      items: [expectedRepos],
      total_count: 1,
    }

    service.setSearchSaved("just for test")

    service.reposFromSearchHttp().subscribe((res: Response) => {
      expect(res.incomplete_results).not.toBeTrue()
      expect(res.items).toContain(expectedRepos)
      expect(res.total_count).toEqual(expectedResponse.items.length)
    })

    const req = httpMock.expectOne(expectedUrl)
    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it("#setReposFromSearch should be altered with #getSearch", () => {
    service.setSearchSaved("just for test")
    service.setReposFromSearch()

    const searchQuery = service.getSearchSaved()

    const exactlyUrl = `https://api.github.com/search/repositories?q=in:name%20${searchQuery}&page=1&per_page=5`

    const req = httpMock.expectOne(exactlyUrl)
    expect(req.request.method).toBe("GET")
  })
})
